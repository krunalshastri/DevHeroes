const router = require('express').Router();
const auth_m = require('../middleware/auth_m');
const Profile = require('../Models/profileModel');
const User = require('../Models/userModel');
const Posts = require('../Models/postModel');
const { body, validationResult } = require('express-validator');
const { findOneAndUpdate } = require('../Models/profileModel');
const request = require('request');

router.route('/profile').get(auth_m, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json('No profile found!');
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

router
  .route('/profile')
  .post(
    [
      auth_m,
      [
        body('status', 'Status is required!').not().isEmpty(),
        body('skills', 'Skills are required!').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      const profileF = {};
      profileF.user = req.user.id;
      if (company) profileF.company = company;
      if (website) profileF.website = website;
      if (location) profileF.location = location;
      if (bio) profileF.bio = bio;
      if (status) profileF.status = status;
      if (githubusername) profileF.githubusername = githubusername;
      if (skills) {
        if (!Array.isArray(skills)) {
          profileF.skills = skills.split(',').map((skills) => skills.trim());
        }
      }

      profileF.social = {};
      if (youtube) profileF.social.youtube = youtube;
      if (facebook) profileF.social.facebook = facebook;
      if (twitter) profileF.social.twitter = twitter;
      if (instagram) profileF.social.instagram = instagram;
      if (linkedin) profileF.social.linkedin = linkedin;

      try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
          //update the profile
          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileF },
            { new: true }
          );

          return res.json(profile);
        }

        profile = new Profile(profileF);
        await profile.save();

        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
      }
    }
  );

//Get all the profiles
router.route('/profile/all').get(async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Get a particular user profile
router.route('/profile/user/:userId').get(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).send('Profile not found!');
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).send('Profile not found!');
    }
    res.status(500).send('Server error!');
  }
});

//Delete the profile
router.route('/profile').delete(auth_m, async (req, res) => {
  try {
    await Posts.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json('User removed!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Add experience
router
  .route('/profile/experience')
  .put(
    [
      auth_m,
      [
        body('title', 'Title required').not().isEmpty(),
        body('company', 'Company required!').not().isEmpty(),
        body('from', 'From date required!').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, company, location, from, to, current, description } =
        req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        console.log(profile);
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
      }
    }
  );

//Delete experience
router.route('/profile/experience/:expId').delete(auth_m, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((exp) => exp._id)
      .indexOf(req.params.expId);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Add education
router
  .route('/profile/education')
  .put(
    [
      auth_m,
      [
        body('school', 'School required').not().isEmpty(),
        body('degree', 'Degree required!').not().isEmpty(),
        body('fieldofstudy', 'Field of study required!').not().isEmpty(),
        body('from', 'From date required!').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
      }
    }
  );

//Delete education
router.route('/profile/education/:eduId').delete(auth_m, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((edu) => edu._id)
      .indexOf(req.params.eduId);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

//Get repos
router.route('/profile/github/:username').get(async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=updated&direction=desc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubSecret}`,

      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found.' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = router;

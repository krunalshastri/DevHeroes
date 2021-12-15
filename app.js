const express = require('express');
const dotEnv = require('dotenv').config();
const User = require('./Models/userModel');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());

app.use('/dev', require('./Routes/users'));
app.use('/dev', require('./Routes/profile'));
app.use('/dev', require('./Routes/auth'));
app.use('/dev/posts', require('./Routes/posts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require('express');
const dotEnv = require('dotenv').config();
const User = require('./Models/userModel');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('API running!!');
});

app.use('/dev', require('./Routes/users'));
app.use('/dev', require('./Routes/profile'));
app.use('/dev', require('./Routes/auth'));
app.use('/dev/posts', require('./Routes/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

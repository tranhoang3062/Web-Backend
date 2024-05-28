require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const access_token = jwt.sign(data, process.env.ACCESSTOKEN_SECRET_KEY, {
    expiresIn: "24m"
  });
  const refresh_token = jwt.sign(data, process.env.REFRESHTOKEN_SECRET_KEY, {
    expiresIn: "30d"
  });
  return {
    access_token, refresh_token
  }
}

module.exports = generateToken;
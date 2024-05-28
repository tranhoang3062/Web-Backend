const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization ? JSON.parse(req.headers.authorization) : {};
  if(!authorization.access_token) {
    res.status(401).json({message: 'No token provided!'});
  } else {
    const access_token = authorization.access_token;
    try {
      const decoded = jwt.decode(access_token);
      jwt.verify(access_token, process.env.ACCESSTOKEN_SECRET_KEY);
      next();
    } catch (err) {
      res.status(402).json(err);
    }
  }
}

module.exports = isAuth;
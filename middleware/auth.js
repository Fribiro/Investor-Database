const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split('')[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    if (req.body.id && req.body.id !== id) {
      throw 'Invalid user id';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request')
    });
  }
};

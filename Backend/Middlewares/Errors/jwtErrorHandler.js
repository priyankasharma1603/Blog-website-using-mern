// jwtErrorHandler.js

const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
      // JWT Malformed or Unauthorized Error
      return res.status(401).json({ error: 'Unauthorized' });
  }
  // Pass other errors to the next middleware (customErrorHandler)
  next(err);
};

module.exports = jwtErrorHandler;

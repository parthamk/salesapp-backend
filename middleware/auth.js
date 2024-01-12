// Import the jsonwebtoken package
const jwt = require('jsonwebtoken');

// Define the middleware function
module.exports = function(req, res, next) {
  // Get the token from the header of the request
  const token = req.header('Authorization');

  // If there's no token, return an error message
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // If there's a token, try to verify it
  try {
    // If the token is valid, the decoded payload is returned
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Add the user from the token's payload to the request object
    req.user = decoded.user;

    // Call the next middleware function
    next();
  } catch (err) {
    // If the token is not valid, return an error message
    res.status(500).json({ message: 'Token is not valid' });
  }
};

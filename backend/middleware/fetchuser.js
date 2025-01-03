const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey'; // Fallback for local testing

const fetchuser = (req, res, next) => {
  // Get the token from the auth header
  const token = req.header('auth-token');
  
  // If no token is provided
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token and extract user data
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;

const jwt = require('jsonwebtoken');
const User = require('../models/landlordModel'); // Import the User model

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming token is sent in headers
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET); // Replace with your actual JWT secret key
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userData = { userId: user._id, userRole: user.role }; // Store user's role (userType) as userRole
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

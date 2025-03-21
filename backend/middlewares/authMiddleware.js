const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // ✅ Decode JWT
    req.user = decoded; // ✅ Store user info
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;

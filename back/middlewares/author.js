const User = require("../model/User");
const jwt=require("jsonwebtoken")
const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );
    const user = await User.findById(
      decoded.userID
    ).select("-password");
    if (!user) {
      return res
        .status(401)
        .json([{ msg: "unauthorized user" }]);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json([{ msg: "unauthorized" }]);
  }
};
module.exports = isAuth;

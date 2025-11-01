import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ success: false, message: "No Token Found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

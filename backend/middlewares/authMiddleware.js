import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token, auth denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log("USER FROM TOKEN:", decoded.user);

    // ✅ IMPORTANT
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;




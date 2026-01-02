import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();

const secret = process.env.JWT_SECRET; // make sure your .env matches

export default (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.header("Authorization"); // "Bearer <token>"
    if (!authHeader) return res.status(403).json("Not Authorized");

    const jwtToken = authHeader.split(" ")[1]; // get the token part
    if (!jwtToken) return res.status(403).json("Token missing");

    // Verify token
    const payload = jwt.verify(jwtToken, secret);
    req.user = payload.user; // attach user info to request

    next(); // allow route to continue
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};


import jwt from "jsonwebtoken";

const JWT_SECRET="secret"

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Access Denied.login to get access' });
    }
  
    try {
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
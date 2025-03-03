import jwt from "jsonwebtoken"
const JWT_SECRET="secret"
export const generateCookie = (res, userId) => {
  const token = jwt.sign({ userId },JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
   
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};


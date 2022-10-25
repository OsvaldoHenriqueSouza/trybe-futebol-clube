import { NextFunction, Request, Response } from 'express';

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateFieldLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validateEmail(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateFieldLogin;

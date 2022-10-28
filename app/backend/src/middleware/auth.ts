import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');

const { JWT_SECRET = 'jwt_secret' } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    req.body = { ...req.body, user: payload };
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default auth;

import { Secret, sign } from 'jsonwebtoken';

const { JWT_SECRET = 'jwt_secret' } = process.env;

const jwtConfig = {
  expiresIn: '7d',
};

function generateToken(email: string): string {
  const payload = { email };
  const token = sign(payload, JWT_SECRET as Secret, jwtConfig);
  return token;
}

export default generateToken;

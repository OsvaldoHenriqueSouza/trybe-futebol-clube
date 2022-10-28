import { Secret, sign } from 'jsonwebtoken';

const { JWT_SECRET = 'jwt_secret' } = process.env;

function generateToken(email: string): string {
  const payload = { email };
  const token = sign(payload, JWT_SECRET as Secret);
  return token;
}

export default generateToken;

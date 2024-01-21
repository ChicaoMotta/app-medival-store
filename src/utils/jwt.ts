import Jwt from 'jsonwebtoken';
import { Token } from '../types/Token';

const secret = process.env.JWT_SECRET || 'not_found';

const createToken = (id: string | number, username: string): Token => {
  const token = Jwt.sign({ id: Number(id), username }, secret);
  return { token };
};

export default createToken;
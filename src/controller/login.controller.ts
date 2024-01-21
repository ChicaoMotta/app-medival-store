import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import loginService from '../service/login.service';
import createToken from '../utils/jwt';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  const { data } = await loginService.login(username);

  if (!data) {
    return res.status(401).json({
      message: 'Username or password invalid',
    });
  }

  const { dataValues: { password: passwordFromDb, id } } = data;

  if (!bcrypt.compareSync(password, passwordFromDb)) {
    return res.status(401).json({
      message: 'Username or password invalid',
    });
  }

  const token = createToken(id, username);
  
  return res.status(200).json(token);
};

export default { login };
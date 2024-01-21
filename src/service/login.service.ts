import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponseSuccess } from '../types/serviceResponse';

const login = async (username: string): Promise<ServiceResponseSuccess<UserSequelizeModel>> => {
  const [getUser] = await UserModel.findAll({
    where: {
      username,
    },
  });

  return { status: 'SUCCESSFUL', data: getUser };
};

export default { login };
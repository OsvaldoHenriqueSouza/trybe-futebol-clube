// import ErrorStatus from '../helpers/errorStatus';
import { compare } from 'bcryptjs';
import generatorJWT from '../helpers/generatorJWT';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

class UserService {
  private model = UserModel;

  async loginUser(user: IUser): Promise<string> {
    const { email, password } = user;
    const userExists = await this.model.findOne({ where: { email } });
    if (!userExists) {
      return 'Not found';
    }
    const validatePassword = await compare(password, userExists.password);
    if (!validatePassword) {
      return 'Not found';
    }
    const token = generatorJWT.generateToken(userExists.id, userExists.role);
    return token;
  }
}

export default UserService;

// import ErrorStatus from '../helpers/errorStatus';
import { compare } from 'bcryptjs';
import generateToken from '../helpers/generatorJWT';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

class UserService {
  private model = UserModel;

  public async loginUser(user: IUser): Promise<string> {
    const { email, password } = user;
    const userExists = await this.model.findOne({ where: { email } });
    if (!userExists) {
      return 'Not found';
    }
    const validatePassword = await compare(password, userExists.getDataValue('password') as string);
    if (!validatePassword) {
      return 'Not found';
    }
    const token = generateToken(userExists.email);
    return token;
  }

  public async loginVerify(email: string): Promise<any> {
    const user = await this.model.findOne({ where: { email }, raw: true });
    if (!user) {
      return 'Not found';
    }
    return user.role;
  }
}

export default UserService;

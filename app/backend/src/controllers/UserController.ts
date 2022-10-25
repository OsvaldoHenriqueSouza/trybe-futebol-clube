import { Request, Response } from 'express';
import UserService from '../services/UserServices';

class UserController {
  constructor(private userService = new UserService()) { }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.loginUser({ email, password });
    if (token !== 'Not found') {
      return res.status(200).json({ token });
    }
    res.status(401).json({ message: 'Incorrect email or password' });
  }

  verify = (req: Request, res: Response) => {
    const { user } = req.body;
    return res.status(200).json({ role: user.role });
  };
}

export default UserController;

import { Request, Response } from 'express';
import UserService from '../services/UserServices';

class UserController {
  constructor(private userService = new UserService()) { }

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.userService.loginUser({ email, password });
    if (token !== 'Not found') {
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  };

  public loginVerify = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
      const userRole = await this.userService.loginVerify(user.email);
      return res.status(200).json({ role: userRole });
    } catch (err) {
      return res.sendStatus(404);
    }
    // return res.status(200).json({ role: user.role });
  };
}

export default UserController;

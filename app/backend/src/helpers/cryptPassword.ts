import * as bcrypt from 'bcryptjs';

const cryptPasswordValidation = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export default cryptPasswordValidation;

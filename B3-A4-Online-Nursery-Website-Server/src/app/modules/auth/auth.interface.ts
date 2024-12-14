import { userRole } from '../user/user.constant';

//declaring type for user login
export type TUserLogin = {
  email: string;
  password: string;
};

//declaring type for user registration
export type TRegisterUser = {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: keyof typeof userRole;
};

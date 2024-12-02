import { Model } from 'mongoose';
import { userRole } from './auth.constant';

//declaring type for user
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  imageUrl?: string;
}

//declaring type for user with id
export interface TUserWithId extends TUser {
  id: string;
}

//declaring type for user login
export type TUserLogin = {
  email: string;
  password: string;
};

//declaring type definition for doesUserExist and doesPasswordMatch static functions
export interface UserModel extends Model<TUser> {
  doesUserExist(email: string): Promise<TUserWithId>;
  doesPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;

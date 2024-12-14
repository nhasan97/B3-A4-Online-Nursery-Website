import { Model } from 'mongoose';
import { userRole } from './user.constant';

//declaring type for user
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone: string;
  address: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

//declaring type for user with id
export interface TUserWithId extends TUser {
  id: string;
}

//declaring type definition for doesUserExist and doesPasswordMatch static functions
export interface UserModel extends Model<TUser> {
  doesUserExist(email: string): Promise<TUserWithId>;
  doesPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;

// export type TUser = {
//   _id?: string;
//   name: string;
//   email: string;
//   password: string;
//   role: keyof typeof userRole;
//   phone: string;
//   address: string;
//   imageUrl: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   isDeleted?: boolean;
// };

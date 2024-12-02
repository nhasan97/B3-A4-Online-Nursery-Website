export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePhoto: string;
  iat: number;
  exp: number;
};

export type TUserExtended = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  imageUrl: string;
};

export type TUserExtendedProp = {
  user: TUserExtended;
};

export type TAuthState = {
  user: null | TUser;
  token: null | string;
};

export type TLoginInfo = {
  email: string;
  password: string;
};

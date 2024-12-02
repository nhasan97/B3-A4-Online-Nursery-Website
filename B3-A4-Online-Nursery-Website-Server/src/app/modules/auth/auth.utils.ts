import jwt from 'jsonwebtoken';

//function for generating JWT tokens
export const generateToken = (
  jwtPayload: {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePhoto: string | undefined;
  },
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return token;
};

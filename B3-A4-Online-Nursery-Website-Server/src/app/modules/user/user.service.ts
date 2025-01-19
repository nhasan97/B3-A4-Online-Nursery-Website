import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { userModel } from './user.model';
import { userRole } from './user.constant';
import { TUser } from './user.interface';
/*

----------------service function for fetching all users data from DB----------------*/
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const searchableFields = ['name', 'email', 'phone'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = userModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);
  const filterQuery = searchQuery.find({
    role: userRole.user,
    isDeleted: { $ne: true },
    ...queryObject,
  });

  let sort = 'name';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
  // const response = await userModel.find({ role: userRole.user });
  // return response;
};
/*

----------------service function for fetching all users count data from DB----------------*/
const getAllUsersCountFromDB = async () => {
  const response = await userModel.countDocuments({
    role: userRole.user,
    isDeleted: { $ne: true },
  });
  return response;
};
/*

----------------service function for getting user----------------*/
const getUserFromDB = async (id: string) => {
  //seraching user data in DB
  const response = await userModel.findById(id);

  if (!response) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  //returning response
  return response;
};
/*

--------------------------service function for updating the user info in db--------------------------*/
const updateLoggedInUserInfoInDB = async (
  userId: string,
  updatedUserInfo: Partial<TUser>,
) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const response = await userModel.findByIdAndUpdate(userId, updatedUserInfo, {
    new: true,
  });

  return response;
};

export const userServices = {
  getAllUsersFromDB,
  getAllUsersCountFromDB,
  getUserFromDB,
  updateLoggedInUserInfoInDB,
};

import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TMessage } from './message.interface';
import { messageModel } from './message.model';

/*

----------------service function for fetching all categories data from DB----------------*/
const getMessagesForUser = async (
  userEmail: string,
  query: Record<string, unknown>,
) => {
  const queryObject = { ...query };

  const searchableFields = ['name', 'email', 'subject'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // Base query to handle search
  const searchQuery = messageModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Filtering and excluding unnecessary fields
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];
  excludeFields.forEach((el) => delete queryObject[el]);

  const filterQuery = searchQuery.find({
    isDeleted: { $ne: true },
    ...queryObject,
    $or: [
      { sentTo: userEmail }, // Messages received by the user
      { email: userEmail }, // Messages sent by the user
    ],
  });

  // Sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // Pagination
  let limit = 10; // Default limit to 10
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

  // Get paginated data
  const messages = await paginateQuery.limit(limit);

  // Classify messages
  const receivedMessages = messages.filter((msg) => msg.sentTo === userEmail);
  const sentMessages = messages.filter((msg) => msg.email === userEmail);

  // Get document counts for received and sent messages
  const totalReceivedCount = await messageModel.countDocuments({
    isDeleted: { $ne: true },
    sentTo: userEmail,
    // ...queryObject,
  });

  const totalSentCount = await messageModel.countDocuments({
    isDeleted: { $ne: true },
    email: userEmail,
    // ...queryObject,
  });

  return {
    receivedMessages,
    sentMessages,
    totalReceivedCount,
    totalSentCount,
  };
};

// const getAllMessagesFromDB = async (query: Record<string, unknown>) => {
//   const queryObject = { ...query };

//   const searchableFields = ['name', 'email', 'subject'];
//   let searchTerm = '';
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }
//   const searchQuery = messageModel.find({
//     $or: searchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

//   excludeFields.forEach((el) => delete queryObject[el]);
//   const filterQuery = searchQuery.find({
//     isDeleted: { $ne: true },
//     ...queryObject,
//   });

//   let sort = '-createdAt';
//   if (query?.sort) {
//     sort = query?.sort as string;
//   }
//   const sortQuery = filterQuery.sort(sort);

//   let limit = 1;
//   let page = 1;
//   let skip = 0;
//   if (query?.limit) {
//     limit = Number(query?.limit);
//   }
//   if (query?.page) {
//     page = Number(query?.page);
//     skip = page * limit;
//   }

//   const paginateQuery = sortQuery.skip(skip);

//   const limitQuery = await paginateQuery.limit(limit);

//   return limitQuery;
// };
/*

----------------service function for fetching categories count from DB----------------*/
const getMessageCountFromDB = async () => {
  const response = await messageModel.countDocuments({
    isDeleted: { $ne: true },
  });
  return response;
};
/*

----------------service function for inserting message data in DB----------------*/
const postMessageIntoDB = async (messageData: TMessage) => {
  const response = await messageModel.create(messageData);
  return response;
};

/*

----------------service function for updating specific message data from DB----------------*/
const updateMessageStatusIntoDB = async (id: string, status: string) => {
  const query = { _id: id };
  const option = { upsert: false, new: true };
  const updatedDoc = {
    $set: { status },
  };

  const result = await messageModel.updateOne(query, updatedDoc, option);

  return result;
};
/*

----------------service function for deleting specific message data from DB----------------*/
const deleteMessageFromDB = async (id: string) => {
  //checking if the selected message exists or not. If not throwing an error.
  const loadedMessage = await messageModel.doesMessageExist(id);
  if (!loadedMessage) {
    throw new AppError(httpStatus.NOT_FOUND, 'Message not found');
  }

  //deleting message from db
  const messageDeleted = await messageModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  if (!messageDeleted) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete message',
    );
  }

  return messageDeleted;
};

//exporting all the service functions through messageServices object
export const messageServices = {
  getMessagesForUser,
  getMessageCountFromDB,
  postMessageIntoDB,
  updateMessageStatusIntoDB,
  deleteMessageFromDB,
};

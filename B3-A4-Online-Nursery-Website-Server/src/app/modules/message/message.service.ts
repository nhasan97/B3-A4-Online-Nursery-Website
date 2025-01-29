import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TMessage } from './message.interface';
import { messageModel } from './message.model';

/*

----------------service function for fetching messgaes from DB----------------*/
const getMessagesForUserFromDB = async (
  userEmail: string,
  query: Record<string, unknown>,
) => {
  const queryObject = { ...query };

  const searchableFields = ['name', 'email', 'subject', 'sentTo', 'status'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = messageModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);

  let filterQuery;
  if (query?.messageType === 'received') {
    filterQuery = searchQuery.find({
      isDeleted: { $ne: true },
      sentTo: userEmail,
    });
  }
  if (query?.messageType === 'sent') {
    filterQuery = searchQuery.find({
      isDeleted: { $ne: true },
      email: userEmail,
    });
  }

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery?.sort(sort);

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

  const paginateQuery = sortQuery?.skip(skip);

  const limitQuery = await paginateQuery?.limit(limit);

  let messageCountQuery;
  if (query?.messageType === 'received') {
    messageCountQuery = {
      isDeleted: { $ne: true },
      sentTo: userEmail,
    };
  }
  if (query?.messageType === 'sent') {
    messageCountQuery = {
      isDeleted: { $ne: true },
      email: userEmail,
    };
  }

  const totalMessageCount =
    await messageModel.countDocuments(messageCountQuery);

  return { limitQuery, totalMessageCount };
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
  getMessagesForUserFromDB,
  postMessageIntoDB,
  updateMessageStatusIntoDB,
  deleteMessageFromDB,
};

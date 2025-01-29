import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { messageServices } from './message.service';

/*

--------------controller for getting all messages data from DB----------------*/
const getMessagesForUser = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await messageServices.getMessagesForUserFromDB(
    req?.params?.userEmail,
    req?.query,
  );

  //sending response
  //   if (response.length) {
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Messages retrieved successfully',
    response,
  );
  //   } else {
  //     sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  //   }
});
/*

----------------controller for inserting new message data in DB----------------*/
const postMessage = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await messageServices.postMessageIntoDB(req.body);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Message sent successfully', response);
});
/*

--------------controller for updating specific message info in DB----------------*/
const updateMessageStatus = catchAsync(async (req, res) => {
  const order = await messageServices.updateMessageStatusIntoDB(
    req?.params?.id,
    req?.body?.status as string,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'order status changed Successfully',
    order,
  );
});

/*

--------------controller for updating specific message info in DB----------------*/
const deleteMessage = catchAsync(async (req, res) => {
  //Passing id to service function
  const response = await messageServices.deleteMessageFromDB(req.params.id);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Message deleted successfully',
    response,
  );
});
//exporting all the controller functions through messageControllers object
export const messageControllers = {
  getMessagesForUser,
  postMessage,
  updateMessageStatus,
  deleteMessage,
};

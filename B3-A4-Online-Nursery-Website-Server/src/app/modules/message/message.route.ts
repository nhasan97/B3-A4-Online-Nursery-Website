import express from 'express';
import { messageControllers } from './message.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MessageValidation } from './message.validation';

const router = express.Router();

//------------route for fetching all the message data from DB------------
router.get(
  '/get-user-messages/:userEmail',
  messageControllers.getMessagesForUser,
);

//------------route for inserting new message data in DB------------
router.post(
  '/create-message',
  validateRequest(MessageValidation.createMessageValidationSchema),
  messageControllers.postMessage,
);

//------------route for updating specific message data in DB------------
router.patch(
  '/edit-message-status/:id',
  // auth(userRole.admin),
  messageControllers.updateMessageStatus,
);

//------------route for deleting specific message data from DB------------
router.delete('/delete-message/:id', messageControllers.deleteMessage);

//exporting routes
export const messageRoutes = router;

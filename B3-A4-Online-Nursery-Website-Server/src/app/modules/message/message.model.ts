import { model, Schema } from 'mongoose';
import { MessageModel, TMessage } from './message.interface';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { messageStatus } from './message.constant';

//creating mongoose schema as the first layer of validation for message data
const messageSchema = new Schema<TMessage, MessageModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },

    sendersImage: {
      type: String,
      required: false,
      trim: true,
    },
    sentTo: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Replied'],
      required: true,
      default: messageStatus.Pending,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

//using document middleware for checking if the document already exists or not
messageSchema.pre('save', async function (next) {
  const doesExist = await messageModel.findOne({
    name: this.name,
    email: this.email,
    subject: this.subject,
    message: this.message,
    sendersImage: this.sendersImage,
    sentTo: this.sentTo,
    status: this.status,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Message already exists',
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
messageSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
messageSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if the message exists or not using static method
messageSchema.statics.doesMessageExist = async function (id: string) {
  return await messageModel.findById(id);
};

//creating and exporting model for message
export const messageModel = model<TMessage, MessageModel>(
  'Meassage',
  messageSchema,
);

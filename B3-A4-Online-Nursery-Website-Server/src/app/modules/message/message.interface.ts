import { Model } from 'mongoose';
import { messageStatus } from './message.constant';

export type TMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  sendersImage?: string;
  sentTo: string;
  status: keyof typeof messageStatus;
  isDeleted?: boolean;
};

//declaring type definition for doesMessageExist static function
export interface MessageModel extends Model<TMessage> {
  doesMessageExist(id: string): Promise<TMessage>;
}

import { Model } from 'mongoose';

export type Tblog = {
  _id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorImage: string;
  authorEmail: string;
  content: string;
  tags: {
    tag: string;
  }[];
  readingTime: string;
  like: number;
  dislike: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export interface BlogModel extends Model<Tblog> {
  doesBlogExist(id: string): Promise<Tblog>;
}

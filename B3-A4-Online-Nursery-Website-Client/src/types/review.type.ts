import { TUserExtended } from "./auth.type";

export const REVIEW_TYPE = {
  Overall: "Overall",
  Product: "Product",
} as const;

export type TReview = {
  _id?: string;
  user: TUserExtended | string;
  product?: string;
  rating: number;
  say: string;
  type: keyof typeof REVIEW_TYPE;
  isDeleted?: boolean;
};

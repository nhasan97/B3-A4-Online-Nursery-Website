import { ReactNode } from "react";

export type TTitle = {
  mainTitle: string;
  subTitle?: string;
};

export type TTitleProp = {
  title: TTitle;
};

export type TProtectedRoute = {
  children: ReactNode;
  role: string;
};

export type ToastMethod = (
  msg: string,
  options?: { duration?: number }
) => void;

export type TPaginationProp = {
  loadingDataLength: boolean;
  dataLength: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

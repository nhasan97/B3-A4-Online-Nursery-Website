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

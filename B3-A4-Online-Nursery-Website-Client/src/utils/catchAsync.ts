/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";
import { toast } from "sonner";

export const catchAsync = (
  fn: (e: FormEvent, ...args: any[]) => Promise<void>
) => {
  return async (e: FormEvent, ...args: any[]) => {
    try {
      await fn(e, ...args);
    } catch (err: any) {
      toast.error(err.data.message, { duration: 2000 });
    }
  };
};

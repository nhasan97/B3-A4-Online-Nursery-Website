/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const displaySuccessToast = (res: any) => {
  if (res?.success && res.statusCode === 200) {
    toast.success(res?.message, {
      duration: 2000,
    });
  }
};

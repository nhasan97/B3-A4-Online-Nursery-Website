import { Toaster } from "sonner";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiFillInfoCircle,
} from "react-icons/ai";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      icons={{
        success: <AiFillCheckCircle className="text-xl text-green-800" />,
        info: <AiFillInfoCircle className="text-xl text-blue-500" />,
        warning: (
          <AiFillExclamationCircle className="text-xl text-yellow-500" />
        ),
        error: <AiFillCloseCircle className="text-xl text-red-800" />,
        // loading: <LoadingIcon />,
      }}
    />
  );
};

export default CustomToaster;

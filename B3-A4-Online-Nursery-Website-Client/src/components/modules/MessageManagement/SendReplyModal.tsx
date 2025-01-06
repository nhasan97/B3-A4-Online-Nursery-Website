/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import messageApi from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { TMessage } from "@/types/message.type";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues, useForm } from "react-hook-form";
import { FaReply } from "react-icons/fa";

const SendReplyModal = ({ message }: { message: TMessage }) => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: (user as TUser)?.name || "",
      email: (user as TUser)?.email || "",
      subject: `Reply to ${message?.subject}` || "",
      message: "",
    },
  });

  const [sendMessage] = messageApi.usePostMessageMutation();
  const [editMessageStatus] = messageApi.useEditMessageStatusMutation();

  const handleSendMessage = async (data: FieldValues) => {
    const meassgeInfo = {
      ...data,
      sendersImage:
        (user as TUser)?.profilePhoto || import.meta.env.VITE_USER_IMAGE,
      sentTo: message?.email,
    };

    const payload = {
      _id: message?._id,
      status: "Replied",
    };
    const res = await sendMessage(meassgeInfo).unwrap();
    if (res) {
      await editMessageStatus(payload).unwrap();
    }

    displaySuccessToast(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <FaReply />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">
            Reply to {message?.name}
          </DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(handleSendMessage)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Name
            </Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Name"
              required
              readOnly
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Email
            </Label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Email"
              required
              readOnly
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Subject
            </Label>
            <Input
              type="text"
              {...register("subject")}
              placeholder="Subject"
              required
              readOnly
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Message
            </Label>
            <Textarea
              {...register("message")}
              placeholder="Message"
              required
              className="col-span-3"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5D7E5F] text-lg rounded-full"
          >
            Send <i className="fa-solid fa-paper-plane ml-2" />
          </Button>
        </form>

        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SendReplyModal;

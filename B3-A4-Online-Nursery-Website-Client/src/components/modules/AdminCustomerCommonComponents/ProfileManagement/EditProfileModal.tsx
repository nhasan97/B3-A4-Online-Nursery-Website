import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { IoIosSave } from "react-icons/io";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { TUserExtended } from "@/types/auth.type";
import { FormEvent, useState } from "react";
import { catchAsync } from "@/utils/catchAsync";
import { uploadImage } from "@/utils/imageUploader";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import profileApi from "@/redux/api/profile.Api";

const EditProfileModal = ({ user }: { user: TUserExtended }) => {
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };

    reader.readAsDataURL(imageFile);
  }

  const [updateLoggedInUserInfo] =
    profileApi.useUpdateLoggedInUserInfoMutation();

  const handleEditProfile = catchAsync(async (e: FormEvent) => {
    e.preventDefault();
    let editedImage;
    if (imageFile) {
      editedImage = await uploadImage(imageFile as File);
    } else {
      editedImage = user?.imageUrl;
    }
    const payload = {
      _id: user?._id,
      updatedUserDetails: {
        name,
        phone,
        address,
        imageUrl: editedImage,
      },
    };

    const res = await updateLoggedInUserInfo(payload).unwrap();
    displaySuccessToast(res);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5D7E5F] text-white text-base sm:text-lg rounded-full -mt-6">
          Edit Profile Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Edit Profile</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleEditProfile(e)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left text-[#757575]">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-left text-[#757575]">
              Phone
            </Label>
            <Input
              id="phone"
              className="col-span-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left text-[#757575]">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex  justify-center items-center gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <img
                src={imageUrl}
                alt=""
                className="size-20 p-[2px] border-2 border-[#5D7E5F] rounded-full"
              />
              <Input
                type="file"
                id="picture"
                className="col-span-3"
                onChange={(e) => setImageFile(e.target.files?.[0] as File)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

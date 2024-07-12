import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { uploadImage } from "@/utiils/imageUploader";
import { toast } from "sonner";
import categoryApi from "@/redux/api/CategoryApi";
import { TCategory } from "@/types/category.type";

const AddCategoryModal = () => {
  const [addCategory] = categoryApi.useAddCategoryMutation();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const image = await uploadImage(imageFile);

    const categoryDetails: TCategory = {
      category,
      description,
      image,
    };
    try {
      const res = await addCategory(categoryDetails).unwrap();
      if (res.success && res.statusCode === 200) {
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5D7E5F] text-lg font-semibold my-5 space-x-2 rounded-full">
          <FaCirclePlus /> <p>Category</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Add Category</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Input
              id="category"
              className="col-span-3"
              required
              onBlur={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left text-[#757575]">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              required
              onBlur={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-left text-[#757575]">
              Picture
            </Label>
            <Input
              type="file"
              id="picture"
              required
              className="col-span-3"
              onBlur={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;

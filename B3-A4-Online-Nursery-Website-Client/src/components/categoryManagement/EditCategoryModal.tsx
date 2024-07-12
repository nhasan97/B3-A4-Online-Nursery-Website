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
import { MdEditDocument } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { uploadImage } from "@/utiils/imageUploader";
import { toast } from "sonner";
import { TCategory } from "@/types/category.type";
import categoryApi from "@/redux/api/CategoryApi";

const EditCategoryModal = ({ category }: { category: TCategory }) => {
  const [editCategory] = categoryApi.useEditCategoryMutation();

  const [editedCategory, setEditedCategory] = useState(category?.category);
  const [editedDescription, setEditedDescription] = useState(
    category?.description
  );
  const [editedImageFile, setEditedImageFile] = useState<File | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let editedImage;

    if (editedImageFile) {
      editedImage = await uploadImage(editedImageFile as File);
    } else {
      editedImage = category?.image;
    }

    const payload = {
      _id: category?._id,
      categoryDetails: {
        category: editedCategory,
        description: editedDescription,
        image: editedImage,
      },
    };

    try {
      const res = await editCategory(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdEditDocument />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Edit Category</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Input
              id="category"
              className="col-span-3"
              defaultValue={category?.category}
              onBlur={(e) => setEditedCategory(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left text-[#757575]">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              defaultValue={category?.description}
              onBlur={(e) => setEditedDescription(e.target.value)}
            />
          </div>

          <div className="flex  justify-center items-center gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <img
                src={category?.image}
                alt=""
                className="size-20 p-[2px] border-2 border-[#5D7E5F] rounded-full"
              />
              <Input
                type="file"
                id="picture"
                className="col-span-3"
                onBlur={(e) => setEditedImageFile(e.target.files?.[0] as File)}
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

export default EditCategoryModal;

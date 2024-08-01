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
import { TCategoryContext } from "@/types/category.type";
import useCategoryContext from "@/hooks/useCategoryContext";

const AddCategoryModal = () => {
  const { setCategory, setDescription, setImageFile, handleAddCategory } =
    useCategoryContext() as TCategoryContext;

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

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleAddCategory(e)}
        >
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
              onBlur={(e) => setImageFile(e.target.files?.[0] as File)}
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

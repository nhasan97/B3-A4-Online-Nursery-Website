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
import { TCategoryContext, TCategoryProp } from "@/types/category.type";
import useCategoryContext from "@/hooks/useCategoryContext";

const EditCategoryModal = ({ category }: TCategoryProp) => {
  const { setCategory, setDescription, setImageFile, handleEditCategory } =
    useCategoryContext() as TCategoryContext;

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

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleEditCategory(e, category)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Input
              id="category"
              className="col-span-3"
              defaultValue={category?.category}
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
              defaultValue={category?.description}
              onBlur={(e) => setDescription(e.target.value)}
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
                onBlur={(e) => setImageFile(e.target.files?.[0] as File)}
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

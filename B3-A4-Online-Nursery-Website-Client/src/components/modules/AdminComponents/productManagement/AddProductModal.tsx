import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { TProductCrudContext } from "@/types/product.type";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import Loading from "../../../shared/Loading";
import NoData from "../../../shared/NoData";
import { TCategory, TCategoryContext } from "@/types/category.type";
import useCategoryContext from "@/hooks/useCategoryContext";
import useProductCrudContext from "@/hooks/useProductCrudContext";

const AddProductModal = () => {
  const { loadingCategories, categories } =
    useCategoryContext() as TCategoryContext;

  const {
    setTitle,
    setDescription,
    setCategory,
    setPrice,
    setRating,
    setStock,
    setImageFile,
    handleAddProduct,
  } = useProductCrudContext() as TProductCrudContext;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5D7E5F] text-base md:text-lg font-semibold space-x-2 rounded-full">
          <FaCirclePlus /> <p>Product</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Add Product</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={(e) => handleAddProduct(e)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              required
              onBlur={(e) => setTitle(e.target.value)}
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
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Select required onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {loadingCategories ? (
                    <Loading></Loading>
                  ) : categories?.length <= 0 ? (
                    <NoData text={"No Categories found"}></NoData>
                  ) : (
                    categories?.map((category: TCategory) => (
                      <SelectItem key={category._id} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-left text-[#757575]">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              min={0}
              step={0.01}
              required
              className="col-span-3"
              onBlur={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-left text-[#757575]">
              Rating
            </Label>
            <Input
              type="number"
              id="rating"
              min={0}
              max={5}
              step={0.5}
              required
              className="col-span-3"
              onBlur={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-left text-[#757575]">
              Stock
            </Label>
            <Input
              type="number"
              id="stock"
              min={0}
              required
              className="col-span-3"
              onBlur={(e) => setStock(Number(e.target.value))}
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

export default AddProductModal;

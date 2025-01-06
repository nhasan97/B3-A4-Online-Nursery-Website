import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { MdEditDocument } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { TProductCrudContext, TProductProp } from "@/types/product.type";
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

const EditProductModal = ({ product }: TProductProp) => {
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
    handleEditProduct,
  } = useProductCrudContext() as TProductCrudContext;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdEditDocument />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Edit Product</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleEditProduct(e, product)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              defaultValue={product?.title}
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
              defaultValue={product?.description}
              onBlur={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Select
              defaultValue={product?.category}
              onValueChange={(value) => setCategory(value)}
            >
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
              className="col-span-3"
              defaultValue={product?.price}
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
              className="col-span-3"
              defaultValue={product?.rating}
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
              className="col-span-3"
              defaultValue={product?.stock}
              onBlur={(e) => setStock(Number(e.target.value))}
            />
          </div>
          <div className="flex  justify-center items-center gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <img
                src={product?.image}
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

export default EditProductModal;

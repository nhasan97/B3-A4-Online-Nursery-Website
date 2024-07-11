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
import { TProductProp } from "@/types/product.type";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { uploadImage } from "@/utiils/imageUploader";
import { toast } from "sonner";
import productApi from "@/redux/api/ProductApi";

const EditProductModal = ({
  _id,
  title,
  description,
  category,
  price,
  rating,
  stock,
  image,
}: TProductProp) => {
  const [editProduct] = productApi.useEditProductMutation();

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedStock, setEditedStock] = useState(stock);
  const [editedImageFile, setEditedImageFile] = useState(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let editedImage;

    if (editedImageFile) {
      editedImage = await uploadImage(editedImageFile);
    } else {
      editedImage = image;
    }

    const payload = {
      _id,
      productDetails: {
        title: editedTitle,
        description: editedDescription,
        category: editedCategory,
        price: editedPrice,
        rating: editedRating,
        stock: editedStock,
        image: editedImage,
      },
    };

    try {
      const res = await editProduct(payload).unwrap();
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
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdEditDocument />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Edit Product</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left text-[#757575]">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              defaultValue={title}
              onBlur={(e) => setEditedTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left text-[#757575]">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              defaultValue={description}
              onBlur={(e) => setEditedDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Select
              defaultValue={category}
              onValueChange={(value) => setEditedCategory(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
              className="col-span-3"
              defaultValue={price}
              onBlur={(e) => setEditedPrice(Number(e.target.value))}
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
              defaultValue={rating}
              onBlur={(e) => setEditedRating(Number(e.target.value))}
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
              defaultValue={stock}
              onBlur={(e) => setEditedStock(Number(e.target.value))}
            />
          </div>
          <div className="flex  justify-center items-center gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="picture" className="text-left text-[#757575]">
                Picture
              </Label> */}
              <img
                src={image}
                alt=""
                className="size-20 p-[2px] border-2 border-[#5D7E5F] rounded-full"
              />
              <Input
                type="file"
                id="picture"
                className="col-span-3"
                onBlur={(e) => setEditedImageFile(e.target.files[0])}
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

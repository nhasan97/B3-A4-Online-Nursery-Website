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
import { TProduct } from "@/types/product.type";
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

const AddProductModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const todoDetails: TProduct = {
      title,
      description,
      category,
      price,
      rating,
      stock,
      image,
    };

    console.log(todoDetails);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
          <FaCirclePlus /> <p>Product</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">Add Product</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
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
              onBlur={(e) => setImage(e.target.value)}
            />
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

export default AddProductModal;
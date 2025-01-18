/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import React, { useEffect, useState } from "react";

const Media = ({
  product,
  existingImages,
  setExisitingImages,
}: {
  product: TProduct;
  existingImages: any;
  setExisitingImages: React.Dispatch<React.SetStateAction<any>>;
}) => {
  useEffect(() => {
    setExisitingImages(product?.images);
  }, [product?.images, setExisitingImages]);

  const { imageFiles, setImageFiles } =
    useProductCrudContext() as TProductCrudContext;

  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handlImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    const updatedImageList = existingImages.filter(
      (img: string) => existingImages.indexOf(img) !== index
    );
    setExisitingImages(updatedImageList);
  };

  const handleRemoveNewImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">Media</h6>

      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="picture" className="text-left text-[#757575]">
          Picture
        </Label>

        <div className="col-span-3">
          <Input
            type="file"
            id="picture"
            className="w-full"
            onChange={(e) => handlImageChange(e)}
          />

          <div className="w-full flex items-center gap-4 my-4 flex-wrap">
            {existingImages.length > 0 &&
              existingImages.map((image: string, index: number) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="item"
                    className="size-20 object-cover object-center rounded-md"
                  />
                  <Button
                    type="button"
                    className="size-2 p-3 rounded-full absolute -top-2 -right-2"
                    onClick={() => handleRemoveExistingImage(index)}
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </Button>
                </div>
              ))}

            {imagePreviews.length > 0 &&
              imagePreviews.map((imageDataUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageDataUrl}
                    alt="item"
                    className="size-20 object-cover object-center rounded-md"
                  />

                  <Button
                    type="button"
                    className="size-2 p-3 rounded-full absolute -top-2 -right-2"
                    onClick={() => handleRemoveNewImage(index)}
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;

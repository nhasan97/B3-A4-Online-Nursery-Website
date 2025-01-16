import productApi from "@/redux/api/ProductApi";
import { TChildren } from "@/types/children.type";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { createContext, FormEvent, useState } from "react";
import { toast } from "sonner";

export const ProductCrudContext = createContext<
  TProductCrudContext | undefined
>(undefined);

const ProductCrudFunctionsProvider = ({ children }: TChildren) => {
  //States for DB operations
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [botanicalName, setBotanicalName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [growthRate, setGrowthRate] = useState("");
  const [height, setHeight] = useState("");
  const [spread, setSpread] = useState("");
  const [sunlightRequirements, setSunlightRequirements] = useState("");
  const [wateringNeeds, setWateringNeeds] = useState("");
  const [soilType, setSoilType] = useState("");
  const [careInstructions, setCareInstructions] = useState("");

  //destructuring DB operation functions from hooks
  const [addProduct] = productApi.useAddProductMutation();
  const [editProduct] = productApi.useEditProductMutation();
  const [deleteProduct] = productApi.useDeleteProductMutation();

  //handling addition
  const handleAddProduct = catchAsync(async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    const productDetails = {
      title,
      description,
      category,
      price,
      rating,
      stock,
      botanicalName,
      plantType,
      growthRate,
      height,
      spread,
      sunlightRequirements,
      wateringNeeds,
      soilType,
      careInstructions,
    };

    formData.append("data", JSON.stringify(productDetails));

    for (const image of imageFiles) {
      formData.append("plantImages", image);
    }

    const res = await addProduct(formData).unwrap();
    displaySuccessToast(res);
  });

  //handling edit
  const handleEditProduct = catchAsync(
    async (e: FormEvent, passedProduct: TProduct) => {
      e.preventDefault();
      // let editedImage;
      // if (imageFile) {
      //   editedImage = await uploadImage(imageFile as File);
      // } else {
      //   editedImage = passedProduct?.images[0];
      // }
      // const payload = {
      //   _id: passedProduct?._id,
      //   productDetails: {
      //     title: title,
      //     description: description,
      //     category: category,
      //     price: price,
      //     rating: rating,
      //     stock: stock,
      //     images: [editedImage],
      //   },
      // };
      // const res = await editProduct(payload).unwrap();
      // displaySuccessToast(res);
    }
  );

  //handling delete
  const handleDeleteProduct = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: catchAsync(async () => {
          const res = await deleteProduct(_id).unwrap();
          displaySuccessToast(res);
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const productCrudFunctions: TProductCrudContext = {
    setTitle,
    setDescription,
    setCategory,
    setPrice,
    setRating,
    setStock,
    imageFiles,
    setImageFiles,
    setBotanicalName,
    setPlantType,
    setGrowthRate,
    setHeight,
    setSpread,
    setSunlightRequirements,
    setWateringNeeds,
    setSoilType,
    setCareInstructions,

    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  };

  return (
    <ProductCrudContext.Provider value={productCrudFunctions}>
      {children}
    </ProductCrudContext.Provider>
  );
};

export default ProductCrudFunctionsProvider;

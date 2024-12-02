import productApi from "@/redux/api/ProductApi";
import { TChildren } from "@/types/children.type";
import { TProduct, TProductContext } from "@/types/product.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { uploadImage } from "@/utils/imageUploader";
import { createContext, FormEvent, useState } from "react";
import { toast } from "sonner";

export const ProductContext = createContext<TProductContext | undefined>(
  undefined
);

const ProductProvider = ({ children }: TChildren) => {
  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToLoad, setCategoryToLoad] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  //States for DB operations
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  //loading products
  const { isLoading: loadingProducts, data: loadedProducts } =
    productApi.useGetProductsQuery({
      searchTerm,
      categoryToLoad,
      sort,
      currentPage,
      itemsPerPage,
    });

  //loading number of total product
  const { isLoading: loadingNumberOfProducts, data: loadedNumberOfProducts } =
    productApi.useGetProductCountQuery(undefined);

  //destructuring DB operation functions from hooks
  const [addProduct] = productApi.useAddProductMutation();
  const [editProduct] = productApi.useEditProductMutation();
  const [deleteProduct] = productApi.useDeleteProductMutation();

  //handling addition
  const handleAddProduct = catchAsync(async (e: FormEvent) => {
    e.preventDefault();
    const image = await uploadImage(imageFile as File);
    const productDetails: TProduct = {
      title,
      description,
      category,
      price,
      rating,
      stock,
      image,
    };
    const res = await addProduct(productDetails).unwrap();
    displaySuccessToast(res);
  });

  //handling edit
  const handleEditProduct = catchAsync(
    async (e: FormEvent, passedProduct: TProduct) => {
      e.preventDefault();
      let editedImage;
      if (imageFile) {
        editedImage = await uploadImage(imageFile as File);
      } else {
        editedImage = passedProduct?.image;
      }
      const payload = {
        _id: passedProduct?._id,
        productDetails: {
          title: title,
          description: description,
          category: category,
          price: price,
          rating: rating,
          stock: stock,
          image: editedImage,
        },
      };
      const res = await editProduct(payload).unwrap();
      displaySuccessToast(res);
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

  const resetBrower = () => {
    setSearchTerm("");
    setCategoryToLoad("");
    setSort("");
  };

  const resetPagination = () => {
    setItemsPerPage(10);
    setCurrentPage(0);
  };

  const productInfo: TProductContext = {
    loadingProducts,
    products: loadedProducts?.data,
    loadingNumberOfProducts,
    numberOfProducts: loadedNumberOfProducts?.data,
    searchTerm,
    categoryToLoad,
    sort,
    itemsPerPage,
    currentPage,
    setSearchTerm,
    setCategoryToLoad,
    setSort,
    setItemsPerPage,
    setCurrentPage,
    setTitle,
    setDescription,
    setCategory,
    setPrice,
    setRating,
    setStock,
    setImageFile,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    resetBrower,
    resetPagination,
  };

  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

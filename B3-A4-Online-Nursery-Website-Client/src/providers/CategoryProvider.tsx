import categoryApi from "@/redux/api/CategoryApi";
import { TCategory, TCategoryContext } from "@/types/category.type";
import { TChildren } from "@/types/children.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { uploadImage } from "@/utils/imageUploader";
import { createContext, FormEvent, useState } from "react";
import { toast } from "sonner";

export const CategoryContext = createContext<TCategoryContext | undefined>(
  undefined
);

const CategoryProvider = ({ children }: TChildren) => {
  //loading Categories
  const { isLoading: loadingCategories, data: loadedCategories } =
    categoryApi.useGetCategoriesQuery(undefined);

  //destructuring DB operation functions from hooks
  const [addCategory] = categoryApi.useAddCategoryMutation();
  const [editCategory] = categoryApi.useEditCategoryMutation();
  const [deleteCategory] = categoryApi.useDeleteCategoryMutation();

  //declaring states
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  //handling addition
  const handleAddCategory = catchAsync(async (e: FormEvent) => {
    e.preventDefault();
    const image = await uploadImage(imageFile as File);
    const categoryDetails: TCategory = {
      category,
      description,
      image,
    };
    const res = await addCategory(categoryDetails).unwrap();
    displaySuccessToast(res);
  });

  //handling editing
  const handleEditCategory = catchAsync(
    async (e: FormEvent, passedCategory: TCategory) => {
      e.preventDefault();
      let editedImage;
      if (imageFile) {
        editedImage = await uploadImage(imageFile as File);
      } else {
        editedImage = passedCategory?.image;
      }
      const payload = {
        _id: passedCategory?._id,
        categoryDetails: {
          category: category,
          description: description,
          image: editedImage,
        },
      };

      const res = await editCategory(payload).unwrap();
      displaySuccessToast(res);
    }
  );

  //handling deleting
  const handleDeleteCategory = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: catchAsync(async () => {
          const res = await deleteCategory(_id).unwrap();
          displaySuccessToast(res);
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const categoryInfo: TCategoryContext = {
    loadingCategories,
    categories: loadedCategories?.data,
    handleDeleteCategory,
    setCategory,
    setDescription,
    setImageFile,
    handleAddCategory,
    handleEditCategory,
  };
  return (
    <CategoryContext.Provider value={categoryInfo}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

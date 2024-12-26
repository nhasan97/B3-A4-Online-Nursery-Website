import { createContext, FormEvent, useState } from "react";
import { TCategory, TCategoryCrudContext } from "@/types/category.type";
import categoryApi from "@/redux/api/CategoryApi";
import { TChildren } from "@/types/children.type";
import { catchAsync } from "@/utils/catchAsync";
import { uploadImage } from "@/utils/imageUploader";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { toast } from "sonner";

export const CategoryCrudContext = createContext<
  TCategoryCrudContext | undefined
>(undefined);

const CategoryCrudFunctionsProvider = ({ children }: TChildren) => {
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

  const categoryCrudFunctions: TCategoryCrudContext = {
    setCategory,
    setDescription,
    setImageFile,

    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
  };

  return (
    <CategoryCrudContext.Provider value={categoryCrudFunctions}>
      {children}
    </CategoryCrudContext.Provider>
  );
};

export default CategoryCrudFunctionsProvider;

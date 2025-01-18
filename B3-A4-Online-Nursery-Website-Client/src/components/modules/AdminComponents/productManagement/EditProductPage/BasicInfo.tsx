import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategoryContext from "@/hooks/useCategoryContext";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import categoryApi from "@/redux/api/CategoryApi";
import { TCategory, TCategoryContext } from "@/types/category.type";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { useEffect } from "react";

const BasicInfo = ({ product }: { product: TProduct }) => {
  const {
    title,
    description,
    category,

    setTitle,
    setDescription,
    setCategory,
  } = useProductCrudContext() as TProductCrudContext;

  const { loadingCategoryCount, totalCategory } =
    useCategoryContext() as TCategoryContext;

  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery({
      searchTerm: "",
      sort: "",
      currentPage: 0,
      itemsPerPage: totalCategory,
    });

  useEffect(() => {
    setTitle(product?.title);
    setCategory(product?.category);
    setDescription(product?.description);
  }, [
    setCategory,
    setDescription,
    setTitle,
    product?.category,
    product?.description,
    product?.title,
  ]);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
        Basic Information
      </h6>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-left text-[#757575]">
          Title
        </Label>
        <Input
          id="title"
          className="col-span-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-left text-[#757575]">
          Category
        </Label>
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {loadingCategories || loadingCategoryCount ? (
                <Loading></Loading>
              ) : categories?.data?.length <= 0 ? (
                <NoData text={"No Categories found"}></NoData>
              ) : (
                categories?.data?.map((category: TCategory) => (
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
        <Label htmlFor="description" className="text-left text-[#757575]">
          Description
        </Label>
        <Input
          id="description"
          className="col-span-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInfo;

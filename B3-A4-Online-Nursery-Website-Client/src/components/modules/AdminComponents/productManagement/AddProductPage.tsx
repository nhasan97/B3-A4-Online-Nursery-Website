/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
import { TProductCrudContext } from "@/types/product.type";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoIosSave } from "react-icons/io";

const AddProductPage = () => {
  const { loadingCategoryCount, totalCategory } =
    useCategoryContext() as TCategoryContext;

  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery({
      searchTerm: "",
      sort: "",
      currentPage: 0,
      itemsPerPage: totalCategory,
    });

  const {
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
  } = useProductCrudContext() as TProductCrudContext;

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

  const handleRemoveImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
  };
  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Add Product</title>
        </Helmet>

        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/products">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Add Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <form
            className="bg-white grid gap-12 p-2 sm:p-5 rounded-lg overflow-y-auto"
            onSubmit={(e) => handleAddProduct(e)}
          >
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
                  required
                  onBlur={(e) => setTitle(e.target.value)}
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
                      {loadingCategories || loadingCategoryCount ? (
                        <Loading></Loading>
                      ) : categories?.data?.length <= 0 ? (
                        <NoData text={"No Categories found"}></NoData>
                      ) : (
                        categories?.data?.map((category: TCategory) => (
                          <SelectItem
                            key={category._id}
                            value={category.category}
                          >
                            {category.category}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="description"
                  className="text-left text-[#757575]"
                >
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  required
                  onBlur={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-6">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Pricing & Stock
              </h6>

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
            </div>

            <div className="space-y-3 sm:space-y-6">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Media
              </h6>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="picture" className="text-left text-[#757575]">
                  Picture
                </Label>

                <div className="col-span-3">
                  <Input
                    type="file"
                    id="picture"
                    required
                    className="w-full"
                    onChange={(e) => handlImageChange(e)}
                  />

                  <div className="w-full flex items-center gap-4 my-4 flex-wrap">
                    {imagePreviews.length > 0 &&
                      imagePreviews.map((imageDataUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            key={imageDataUrl}
                            src={imageDataUrl}
                            alt="item"
                            className="size-20 object-cover object-center rounded-md"
                          />

                          <Button
                            type="button"
                            className="size-2 p-3 rounded-full absolute -top-2 -right-2"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <i className="fa-solid fa-xmark text-sm"></i>
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-6">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Botanical Details
              </h6>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="botanicalName"
                  className="text-left text-[#757575]"
                >
                  Botanical Name
                </Label>
                <Input
                  id="botanicalName"
                  className="col-span-3"
                  required
                  onBlur={(e) => setBotanicalName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plantType" className="text-left text-[#757575]">
                  Plant Type
                </Label>
                <Input
                  id="plantType"
                  className="col-span-3"
                  required
                  onBlur={(e) => setPlantType(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="growthRate"
                  className="text-left text-[#757575]"
                >
                  Growth Rate
                </Label>
                <Input
                  id="growthRate"
                  className="col-span-3"
                  required
                  onBlur={(e) => setGrowthRate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-left text-[#757575]">
                  Height
                </Label>
                <Input
                  id="height"
                  className="col-span-3"
                  required
                  onBlur={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="spread" className="text-left text-[#757575]">
                  Spread
                </Label>
                <Input
                  id="spread"
                  className="col-span-3"
                  required
                  onBlur={(e) => setSpread(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-6">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Growing Requirements
              </h6>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sunlight" className="text-left text-[#757575]">
                  Sunlight Requirements
                </Label>
                <Input
                  id="sunlight"
                  className="col-span-3"
                  required
                  onBlur={(e) => setSunlightRequirements(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="waterNeed" className="text-left text-[#757575]">
                  Watering Needs
                </Label>
                <Input
                  id="waterNeed"
                  className="col-span-3"
                  required
                  onBlur={(e) => setWateringNeeds(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="soilType" className="text-left text-[#757575]">
                  Soil Type
                </Label>
                <Input
                  id="soilType"
                  className="col-span-3"
                  required
                  onBlur={(e) => setSoilType(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-6">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Care Instructions
              </h6>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="care" className="text-left text-[#757575]">
                  Care Instructions
                </Label>
                <Input
                  id="care"
                  className="col-span-3"
                  required
                  onBlur={(e) => setCareInstructions(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden items-center gap-4">
              <Label htmlFor="rating" className="text-left text-[#757575]">
                Rating
              </Label>
              <Input
                type="number"
                id="rating"
                value={0}
                required
                hidden
                className="col-span-3"
                onBlur={() => setRating(Number(0))}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </form>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AddProductPage;

import { TCategory, TCategoryContext } from "@/types/category.type";
import Loading from "../../shared/Loading";
import NoData from "../../shared/NoData";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import useCategoryContext from "@/hooks/useCategoryContext";
import useProductContext from "@/hooks/useProductContext";
import { TProductContext } from "@/types/product.type";
import { BiReset } from "react-icons/bi";
import { useState } from "react";

const Browser = ({ caller }: { caller?: string }) => {
  const { loadingCategories, categories } =
    useCategoryContext() as TCategoryContext;

  const {
    searchTerm,
    // categoryToLoad,
    sort,
    setSearchTerm,
    setCategoryToLoad,
    setSort,
    resetBrowser,
  } = useProductContext() as TProductContext;

  const [openBrowser, setOpenBrowser] = useState(false);

  return (
    <div className="w-full ">
      {/* Mobile View */}
      <div className="flex md:hidden relative">
        <Button
          className="bg-[#5D7E5F] text-base font-semibold space-x-2 rounded-full"
          onClick={() => setOpenBrowser(!openBrowser)}
        >
          <i className="fa-solid fa-magnifying-glass-arrow-right"></i>
        </Button>

        <div
          className={`w-64 bg-[#5d7e5ffb] ${
            openBrowser ? "flex flex-col justify-between gap-3" : "hidden"
          } p-2 rounded-lg backdrop-blur-lg absolute top-0 translate-y-12 z-30 transition duration-700 ease-in-out`}
        >
          <Input
            type="text"
            id="search"
            placeholder="Search by Tile, Category"
            className="col-span-3"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></Input>
          {/* filter */}
          <Select
            // value={categoryToLoad}
            onValueChange={(value) => setCategoryToLoad([value])}
          >
            <SelectTrigger
              className={`flex-1 ${
                caller === "ProductsPage" ? "hidden" : "hidden"
              }`}
            >
              <SelectValue placeholder="Filter by category" />
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

          {/* sort */}
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as string)}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="title">Title (A to Z)</SelectItem>
                <SelectItem value="-title">Title (Z to A)</SelectItem>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="-price">Price (High to Low)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* reset */}
          <Button
            className="bg-white text-[#757575] text-base rounded-full"
            onClick={resetBrowser}
          >
            <BiReset className="text-xl"></BiReset> Reset
          </Button>
        </div>
      </div>

      {/* Tab Pc View */}
      <div className="hidden md:flex flex-wrap items-center gap-3">
        {/* search */}
        <div className="flex-1 flex items-center gap-4">
          {/* <Label htmlFor="search" className="text-left text-[#757575]">
            Search
          </Label> */}
          <Input
            type="text"
            id="search"
            placeholder="Search by Tile, Category"
            className="col-span-3"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></Input>
        </div>

        {/* filter */}
        <Select
          // value={categoryToLoad}
          onValueChange={(value) => setCategoryToLoad([value])}
        >
          <SelectTrigger
            className={`flex-1 ${
              caller === "ProductsPage" ? "hidden" : "hidden"
            }`}
          >
            <SelectValue placeholder="Filter by category" />
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

        {/* sort */}
        <Select
          value={sort}
          onValueChange={(value) => setSort(value as string)}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">Title (A to Z)</SelectItem>
              <SelectItem value="-title">Title (Z to A)</SelectItem>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="-price">Price (High to Low)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* reset */}
        <Button
          className="bg-[#98b2992f] text-[#757575] text-xl rounded-full"
          onClick={resetBrowser}
        >
          <BiReset></BiReset>
        </Button>
      </div>
    </div>
  );
};

export default Browser;

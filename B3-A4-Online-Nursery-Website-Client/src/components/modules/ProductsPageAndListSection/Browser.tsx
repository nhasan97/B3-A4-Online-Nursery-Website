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

const Browser = ({ caller }: { caller?: string }) => {
  const { loadingCategories, categories } =
    useCategoryContext() as TCategoryContext;

  const {
    searchTerm,
    categoryToLoad,
    sort,
    setSearchTerm,
    setCategoryToLoad,
    setSort,
    resetBrower,
  } = useProductContext() as TProductContext;

  return (
    <div className="w-full flex flex-wrap items-center gap-3">
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
        value={categoryToLoad}
        onValueChange={(value) => setCategoryToLoad(value as string)}
      >
        <SelectTrigger
          className={`flex-1 ${caller === "ProductsPage" ? "hidden" : ""}`}
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
      <Select value={sort} onValueChange={(value) => setSort(value as string)}>
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
        onClick={resetBrower}
      >
        <BiReset></BiReset>
      </Button>
    </div>
  );
};

export default Browser;

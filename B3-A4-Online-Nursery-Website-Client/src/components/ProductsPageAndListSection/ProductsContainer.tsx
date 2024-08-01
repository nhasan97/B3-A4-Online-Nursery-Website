import { TChildren } from "@/types/children.type";
import Container from "../layouts/rootLayout/Container";
import SiteTitle from "../shared/SiteTitle";
import useCategoryContext from "@/hooks/useCategoryContext";
import { TCategory, TCategoryContext } from "@/types/category.type";
import useProductContext from "@/hooks/useProductContext";
import { TProductContext } from "@/types/product.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loading from "../shared/Loading";
import NoData from "../shared/NoData";
import { Button } from "../ui/button";
import { BiReset } from "react-icons/bi";
import { Input } from "../ui/input";
import { GrPrevious, GrNext } from "react-icons/gr";

const ProductsContainer = ({ children }: TChildren) => {
  const { loadingCategories, categories } =
    useCategoryContext() as TCategoryContext;

  const {
    loadingNumberOfProducts,
    numberOfProducts,
    itemsPerPage,
    currentPage,
    searchTerm,
    categoryToLoad,
    sort,
    setSearchTerm,
    setCategoryToLoad,
    setSort,
    setItemsPerPage,
    setCurrentPage,
  } = useProductContext() as TProductContext;

  let numberOfPages = 0;

  if (!loadingNumberOfProducts) {
    numberOfPages = Math.ceil(numberOfProducts / itemsPerPage);
  }

  const pages = [...Array(numberOfPages).keys()];
  console.log(numberOfProducts, pages);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const reset = () => {
    setSearchTerm("");
    setCategoryToLoad("");
    setSort("");
  };

  return (
    <div className="w-full h-[95%] flex justify-center items-center gap-5 py-6">
      <div className="w-[20%] h-full border rounded-lg p-5">
        {/* filter */}
        <Select
          value={categoryToLoad}
          onValueChange={(value) => setCategoryToLoad(value as string)}
        >
          <SelectTrigger className="flex-1">
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

        {/* reset */}
        <Button
          className="bg-[#98b2992f] text-[#757575] text-xl rounded-full"
          onClick={reset}
        >
          <BiReset></BiReset>
        </Button>
      </div>

      <div className="w-[80%] h-full flex flex-col justify-between">
        <div className="w-full flex justify-between items-center gap-6">
          {/* search */}
          <Input
            type="text"
            id="search"
            placeholder="Search by Tile, Category"
            className="flex-1"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></Input>

          {/* sort */}
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as string)}
          >
            <SelectTrigger className="w-fit">
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
        </div>

        {children}

        <div className="w-full flex justify-center items-center">
          {/* page */}

          <div className="flex items-center">
            <Button
              className="bg-[#98b2992f] text-[#757575] rounded-l-full"
              onClick={handlePrevPage}
            >
              <GrPrevious />
            </Button>
            {pages?.map((page) => (
              <Button
                key={page}
                className={`bg-[#98b2992f] text-[#757575] rounded-none ${
                  currentPage === page ? "selectedPage" : ""
                }`}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              className="bg-[#98b2992f] text-[#757575] rounded-r-full"
              onClick={handleNextPage}
            >
              <GrNext />
            </Button>
          </div>

          {/* limit */}
          <Select
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(0);
            }}
          >
            <SelectTrigger className="w-fit ml-3">
              {/* <SelectValue placeholder="Select number of data to show" /> */}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={`${5}`}>5</SelectItem>
                <SelectItem value={`${10}`}>10</SelectItem>
                <SelectItem value={`${20}`}>20</SelectItem>
                <SelectItem value={`${50}`}>50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;

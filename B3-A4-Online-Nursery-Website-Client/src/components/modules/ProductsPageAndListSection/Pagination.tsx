import useProductContext from "@/hooks/useProductContext";
import { TProductContext } from "@/types/product.type";
import { Button } from "../../ui/button";
import { GrNext, GrPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";

const Pagination = () => {
  const {
    loadingNumberOfProducts,
    numberOfProducts,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    setItemsPerPage,
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

  return (
    <div className="flex justify-center items-center">
      {/* page */}

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

      {/* limit */}
      <Select
        onValueChange={(value) => {
          setItemsPerPage(Number(value));
          setCurrentPage(0);
        }}
      >
        <SelectTrigger className="flex-1 ml-3">
          {/* <SelectValue placeholder="Select number of data to show" /> */}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectItem value={`${5}`}>5</SelectItem> */}
            <SelectItem value={`${10}`}>10</SelectItem>
            <SelectItem value={`${20}`}>20</SelectItem>
            <SelectItem value={`${50}`}>50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Pagination;

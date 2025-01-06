import { TPaginationProp } from "@/types/global.type";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import "../cssStyles/Pagination.css";

const Pagination = ({
  loadingDataLength,
  dataLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}: TPaginationProp) => {
  let numberOfPages = 0;

  if (!loadingDataLength) {
    numberOfPages = Math.ceil(dataLength / itemsPerPage);
  }

  const pages = [...Array(numberOfPages).keys()];

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
    <div className="w-fit mx-auto flex justify-center items-center">
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
            <SelectItem value={`${5}`}>5</SelectItem>
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

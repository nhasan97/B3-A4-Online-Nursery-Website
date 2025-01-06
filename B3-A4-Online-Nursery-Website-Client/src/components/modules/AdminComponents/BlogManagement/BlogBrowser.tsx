import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { BiReset } from "react-icons/bi";

const BlogBrowser = ({
  setSearchTerm,
  sort,
  setSort,
  resetBrowser,
}: {
  //   searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  resetBrowser: () => void;
}) => {
  const [openBrowser, setOpenBrowser] = useState(false);

  return (
    <div className="w-full">
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
            id="search"
            placeholder="Search by title, author and reading duration."
            className="w-full md:w-1/2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
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
                <SelectItem value="createdAt">
                  Date published (ascending)
                </SelectItem>
                <SelectItem value="-createdAt">
                  Date published (descending)
                </SelectItem>
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
      <div className="hidden md:flex gap-6">
        <Input
          id="search"
          placeholder="Search by title, author and reading duration."
          className="w-full md:w-1/2"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
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
              <SelectItem value="createdAt">
                Date published (ascending)
              </SelectItem>
              <SelectItem value="-createdAt">
                Date published (descending)
              </SelectItem>
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

export default BlogBrowser;

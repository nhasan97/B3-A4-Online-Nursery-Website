import React from "react";
import { Input } from "../ui/input";

const CategoryBrowser = ({
  //   searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full">
      <Input
        id="search"
        placeholder="Search by category name"
        className="w-full md:w-1/2"
        // value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default CategoryBrowser;

import { Input } from "@/components/ui/input";
import React from "react";

const CustomerBrowser = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full">
      <Input
        id="search"
        placeholder="Search by name, email & cell"
        className="w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default CustomerBrowser;

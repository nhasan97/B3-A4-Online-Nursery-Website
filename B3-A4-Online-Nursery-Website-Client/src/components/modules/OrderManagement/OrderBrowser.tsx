import { Input } from "@/components/ui/input";

const OrderBrowser = ({
  searchTerm,
  setSearchTerm,
  searchBarText,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchBarText: string;
}) => {
  return (
    <div className="w-full">
      <Input
        id="search"
        placeholder={searchBarText}
        className="w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default OrderBrowser;

import { Input } from "@/components/ui/input";

const WishlistBrowser = ({
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
        placeholder="Search by product name..."
        className="w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default WishlistBrowser;

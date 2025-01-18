import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { useEffect } from "react";

const PriceAndStock = ({ product }: { product: TProduct }) => {
  const {
    price,
    stock,

    setPrice,
    setStock,
  } = useProductCrudContext() as TProductCrudContext;

  useEffect(() => {
    setPrice(product?.price);
    setStock(product?.stock);
  }, [setPrice, setStock, product?.price, product?.stock]);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
        Pricing & Stock
      </h6>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-left text-[#757575]">
          Price
        </Label>
        <Input
          type="number"
          id="price"
          min={0}
          step={0.01}
          className="col-span-3"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock" className="text-left text-[#757575]">
          Stock
        </Label>
        <Input
          type="number"
          id="stock"
          min={0}
          className="col-span-3"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PriceAndStock;

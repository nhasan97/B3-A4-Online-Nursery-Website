import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { useEffect } from "react";

const BotanicalDetails = ({ product }: { product: TProduct }) => {
  const {
    botanicalName,
    plantType,
    growthRate,
    height,
    spread,

    setBotanicalName,
    setPlantType,
    setGrowthRate,
    setHeight,
    setSpread,
  } = useProductCrudContext() as TProductCrudContext;

  useEffect(() => {
    setBotanicalName(product?.botanicalName);
    setPlantType(product?.plantType);
    setGrowthRate(product?.growthRate);
    setHeight(product?.height);
    setSpread(product?.spread);
  }, [
    product?.botanicalName,
    product?.growthRate,
    product?.height,
    product?.plantType,
    product?.spread,
    setBotanicalName,
    setGrowthRate,
    setHeight,
    setPlantType,
    setSpread,
  ]);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
        Botanical Details
      </h6>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="botanicalName" className="text-left text-[#757575]">
          Botanical Name
        </Label>
        <Input
          id="botanicalName"
          className="col-span-3"
          value={botanicalName}
          onChange={(e) => setBotanicalName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="plantType" className="text-left text-[#757575]">
          Plant Type
        </Label>
        <Input
          id="plantType"
          className="col-span-3"
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="growthRate" className="text-left text-[#757575]">
          Growth Rate
        </Label>
        <Input
          id="growthRate"
          className="col-span-3"
          value={growthRate}
          onChange={(e) => setGrowthRate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="height" className="text-left text-[#757575]">
          Height
        </Label>
        <Input
          id="height"
          className="col-span-3"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="spread" className="text-left text-[#757575]">
          Spread
        </Label>
        <Input
          id="spread"
          className="col-span-3"
          value={spread}
          onChange={(e) => setSpread(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BotanicalDetails;

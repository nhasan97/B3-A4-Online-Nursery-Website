import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { useEffect } from "react";

const GrowingRequirement = ({ product }: { product: TProduct }) => {
  const {
    sunlightRequirements,
    wateringNeeds,
    soilType,

    setSunlightRequirements,
    setWateringNeeds,
    setSoilType,
  } = useProductCrudContext() as TProductCrudContext;

  useEffect(() => {
    setSunlightRequirements(product?.sunlightRequirements);
    setWateringNeeds(product?.wateringNeeds);
    setSoilType(product?.soilType);
  }, [
    product?.soilType,
    product?.sunlightRequirements,
    product?.wateringNeeds,
    setSoilType,
    setSunlightRequirements,
    setWateringNeeds,
  ]);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
        Growing Requirements
      </h6>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sunlight" className="text-left text-[#757575]">
          Sunlight Requirements
        </Label>
        <Input
          id="sunlight"
          className="col-span-3"
          value={sunlightRequirements}
          onChange={(e) => setSunlightRequirements(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="waterNeed" className="text-left text-[#757575]">
          Watering Needs
        </Label>
        <Input
          id="waterNeed"
          className="col-span-3"
          value={wateringNeeds}
          onChange={(e) => setWateringNeeds(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="soilType" className="text-left text-[#757575]">
          Soil Type
        </Label>
        <Input
          id="soilType"
          className="col-span-3"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GrowingRequirement;

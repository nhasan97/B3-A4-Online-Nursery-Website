import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProduct, TProductCrudContext } from "@/types/product.type";
import { useEffect } from "react";

const CareInstruction = ({ product }: { product: TProduct }) => {
  const {
    careInstructions,

    setCareInstructions,
  } = useProductCrudContext() as TProductCrudContext;

  useEffect(() => {
    setCareInstructions(product?.careInstructions);
  }, [product?.careInstructions, setCareInstructions]);

  return (
    <div className="space-y-3 sm:space-y-6">
      <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
        Care Instructions
      </h6>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="care" className="text-left text-[#757575]">
          Care Instructions
        </Label>
        <Input
          id="care"
          className="col-span-3"
          value={careInstructions}
          onChange={(e) => setCareInstructions(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CareInstruction;

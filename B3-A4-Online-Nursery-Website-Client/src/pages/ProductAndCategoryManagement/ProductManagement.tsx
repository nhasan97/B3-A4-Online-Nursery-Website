import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import AddProductModal from "@/components/productManagement/AddProductModal";
import ProductTableRow from "@/components/productManagement/ProductTableRow";
import productApi from "@/redux/api/ProductApi";
import { Helmet } from "react-helmet-async";

const ProductManagement = () => {
  const [addProduct, addProductObject] = productApi.useAddProductMutation();

  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>PanaPoll | Dashboard | Surveys</title>
        </Helmet>

        <div className="flex justify-between">
          <AddProductModal addProduct={addProduct}></AddProductModal>
        </div>

        <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
          <table className="w-full">
            {/* head */}
            <thead>
              <tr className="flex  justify-between items-center text-[#757575] p-5 border-b">
                <th className="flex-1">Image</th>
                <th className="flex-1">Title</th>
                <th className="flex-1">Details</th>
                <th className="flex-1">Category</th>
                <th className="flex-1">Price</th>
                <th className="flex-1">Stock</th>
                <th className="flex-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
              <ProductTableRow></ProductTableRow>
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ProductManagement;

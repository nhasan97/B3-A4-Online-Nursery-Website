/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Loading from "@/components/shared/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import productApi from "@/redux/api/ProductApi";
import { Helmet } from "react-helmet-async";
import { IoIosSave } from "react-icons/io";
import { useParams } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import PriceAndStock from "./PriceAndStock";
import Media from "./Media";
import BotanicalDetails from "./BotanicalDetails";
import GrowingRequirement from "./GrowingRequirement";
import CareInstruction from "./CareInstruction";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { TProductCrudContext } from "@/types/product.type";
import { useState } from "react";

const EditProductPage = () => {
  const loadedId = useParams();

  const { isLoading: loadingProduct, data: product } =
    productApi.useGetSingleProductQuery(loadedId._id);

  const { handleEditProduct } = useProductCrudContext() as TProductCrudContext;

  const [existingImages, setExisitingImages] = useState([]);

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Edit Product</title>
        </Helmet>

        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/products">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {loadingProduct ? (
            <Loading />
          ) : (
            <form
              className="bg-white grid gap-12 p-2 sm:p-5 rounded-lg overflow-y-auto"
              onSubmit={(e) =>
                handleEditProduct(e, product?.data, existingImages)
              }
            >
              <BasicInfo product={product?.data} />

              <PriceAndStock product={product?.data} />

              <Media
                product={product?.data}
                existingImages={existingImages}
                setExisitingImages={setExisitingImages}
              />

              <BotanicalDetails product={product?.data} />

              <GrowingRequirement product={product?.data} />

              <CareInstruction product={product?.data} />

              <Button
                type="submit"
                className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
              >
                <IoIosSave /> <p>Save</p>
              </Button>
            </form>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default EditProductPage;

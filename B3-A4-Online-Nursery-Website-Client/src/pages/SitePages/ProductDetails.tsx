import Container from "@/components/layouts/rootLayout/Container";
import ProductDetailsSection from "@/components/modules/SiteComponents/ProductDetailsPage/ProductDetailsSection";
import ProductReviewsSection from "@/components/modules/SiteComponents/ProductDetailsPage/ProductReviewsSection";
import YouMayAlsoLikeSection from "@/components/modules/SiteComponents/ProductDetailsPage/YouMayAlsoLikeSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useProductContext from "@/hooks/useProductContext";
import productApi from "@/redux/api/ProductApi";
import reviewApi from "@/redux/api/reviewApi";
import { TProductContext } from "@/types/product.type";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const loadedId = useParams();

  const { isLoading: loadingProduct, data: product } =
    productApi.useGetSingleProductQuery(loadedId._id);

  const { isLoading: loadingProductReviews, data: productReviews } =
    reviewApi.useGetProductReviewsQuery(loadedId._id);

  const {
    loadingNumberOfProducts,
    numberOfProducts,
    setItemsPerPage,
    setCategoryToLoad,
    loadingProducts,
    products,
    resetBrowser,
    resetPagination,
  } = useProductContext() as TProductContext;

  useEffect(() => {
    resetBrowser();
    resetPagination();
    setItemsPerPage(numberOfProducts);
    setCategoryToLoad([product?.data?.category]);
  }, [
    numberOfProducts,
    resetBrowser,
    resetPagination,
    setItemsPerPage,
    product?.data?.category,
    setCategoryToLoad,
  ]);

  return (
    <div className="w-full h-full py-10 bg-[url(../public/leaf2.png)] bg-no-repeat bg-right-top bg-contain bg-fixed">
      <Container>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href="/all-products">Products</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Product Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ProductDetailsSection
            product={product?.data}
            loadingProduct={loadingProduct}
            loadingProductReviews={loadingProductReviews}
            productReviewsCount={productReviews?.data?.length}
          />

          <ProductReviewsSection
            loadingProductReviews={loadingProductReviews}
            productReviews={productReviews?.data}
          />

          <YouMayAlsoLikeSection
            loadingProducts={loadingProducts}
            loadingNumberOfProducts={loadingNumberOfProducts}
            products={products}
            loadedId={loadedId?._id as string}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;

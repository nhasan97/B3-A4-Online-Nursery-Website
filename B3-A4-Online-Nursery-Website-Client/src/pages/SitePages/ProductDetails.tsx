import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/modules/ProductsPageAndManagement/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import StarRating from "@/components/shared/StarRating";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import useCartContext from "@/hooks/useCartContext";
import useProductContext from "@/hooks/useProductContext";
import productApi from "@/redux/api/ProductApi";
import { TCartContext } from "@/types/cart.type";
import { TProduct, TProductContext } from "@/types/product.type";
import { useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const loadedId = useParams();

  const { isLoading: loadingProduct, data: product } =
    productApi.useGetSingleProductQuery(loadedId._id);

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

  const { desiredQty, handleEditQtyInProductDetails, handleAddToCart } =
    useCartContext() as TCartContext;

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

          <div>
            {loadingProduct ? (
              <Loading></Loading>
            ) : (
              <div className="w-full flex flex-col md:flex-row justify-center items-center bg-white py-5">
                <div className="w-full md:w-1/2 h-full">
                  <img
                    src={product?.data?.image}
                    alt=""
                    className="w-full md:h-[450px] lg:h-[550px] rounded-[20px] object-fill object-center"
                  />
                </div>
                <div className="w-full md:w-1/2 h-full p-5 md:p-10 flex flex-col justify-between items-start gap-10">
                  <div className="flex items-center gap-3">
                    <h6 className="text-2xl md:text-3xl lg:text-4xl text-[#505050] font-medium">
                      {product?.data?.title}
                    </h6>
                    <p className="text-sm text-[#5D7E5F] p-1 rounded-full border border-[#5D7E5F]">
                      {product?.data?.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <StarRating rating={product?.data?.rating}></StarRating>
                    <p>(4)</p>
                  </div>

                  <p className="text-base text-[#757575] text-justify">
                    {product?.data?.description}
                  </p>

                  <h5 className="text-2xl font-semibold">
                    Price: ${product?.data?.price}
                  </h5>

                  <div className="flex justify-center items-center gap-4 text-2xl p-3 rounded-lg border">
                    <IoMdArrowDropup
                      className="hover:text-green-500 border-r"
                      onClick={() => handleEditQtyInProductDetails(1, product)}
                    />
                    {desiredQty}
                    <IoMdArrowDropdown
                      className="hover:text-red-500 border-l"
                      onClick={() => handleEditQtyInProductDetails(-1, product)}
                    />
                  </div>

                  <Button
                    className="text-lg bg-[#5D7E5F] rounded-[20px]"
                    disabled={product?.data?.stock <= 0}
                    onClick={() => handleAddToCart(desiredQty, product?.data)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[#505050] text-2xl font-semibold">
              You May Also Like
            </h3>

            {loadingProducts || loadingNumberOfProducts ? (
              <Loading></Loading>
            ) : products?.length > 0 ? (
              <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 my-5 overflow-y-auto">
                {products
                  .filter((product) => product._id !== loadedId._id)
                  .map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            ) : (
              <NoData text={"No Products Found"}></NoData>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;

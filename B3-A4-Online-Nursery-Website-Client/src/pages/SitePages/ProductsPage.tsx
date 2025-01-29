import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/modules/ProductsPageAndManagement/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { TProduct, TProductContext } from "@/types/product.type";
import useProductContext from "@/hooks/useProductContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useCategoryContext from "@/hooks/useCategoryContext";
import { TCategory, TCategoryContext } from "@/types/category.type";
import Pagination from "@/components/shared/Pagination";
import categoryApi from "@/redux/api/CategoryApi";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider";
import ProductBrowser from "@/components/modules/ProductsPageAndManagement/ProductBrowser";
import ProductCardSkeleton from "@/components/modules/ProductsPageAndManagement/ProductCardSkeleton";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const { category: urlCategory } = useParams();

  const {
    loadingNumberOfProducts,
    numberOfProducts,
    loadingMinMaxPrice,
    setMinProductPrice,
    setMaxProductPrice,
    defaultMax,
    defaultMin,
    maxProductPrice,
    minProductPrice,
    setCategoryToLoad,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    loadingProducts,
    products,
    // resetPagination,
  } = useProductContext() as TProductContext;

  const [openFilter, setOpenFilter] = useState(false);
  const { loadingCategoryCount, totalCategory } =
    useCategoryContext() as TCategoryContext;

  const { isLoading: loadingCategories, data: loadedCategories } =
    categoryApi.useGetCategoriesQuery({
      searchTerm: "",
      sort: "",
      currentPage: 0,
      itemsPerPage: totalCategory,
    });

  const [ratingRangeValue, setRatingRangeValue] = useState([0, 5]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : []
  );

  const handleCheckboxCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, value];
      }
      return prev.filter((item) => item !== value);
    });
  };

  useEffect(() => {
    setCategoryToLoad(selectedCategories);
  }, [selectedCategories, setCategoryToLoad]);

  const handlePriceSliderChange = (values: { min: number; max: number }) => {
    setMinProductPrice(values.min);
    setMaxProductPrice(values.max);
  };

  const handleRatingSliderChange = (values: { min: number; max: number }) => {
    setRatingRangeValue([values.min, values.max]);
  };
  return (
    <div className="w-full h-full py-10">
      <Container>
        <div className="w-full h-screen flex flex-col justify-between">
          {/* <SiteTitle title={"Products"}></SiteTitle> */}

          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* browser */}
          <div className="w-full h-[5%] flex">
            <ProductBrowser caller={"ProductsPage"} />

            <Button
              className="flex lg:hidden bg-[#5D7E5F] text-base font-semibold space-x-2 rounded-full ml-2"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <i className="fa-solid fa-filter"></i>
            </Button>
          </div>

          <div className="w-full h-[80%] flex items-center my-6 gap-6 relative overflow-hidden">
            <div
              className={`bg-white w-60 lg:w-[20%] h-full border rounded-l-[20px] lg:rounded-[20px] absolute z-20 lg:z-auto lg:static right-0 lg:translate-x-0 ${
                openFilter
                  ? "translate-x-0 transition duration-300 ease-in-out"
                  : "translate-x-full transition duration-300 ease-in-out"
              }`}
            >
              {loadingCategoryCount ||
              loadingCategories ||
              loadingMinMaxPrice ? (
                <Loading />
              ) : (
                <>
                  <div className="h-[50%] p-5">
                    <h2 className="text-[#757575] text-lg font-semibold mb-2">
                      Filter by category
                    </h2>
                    <div className="h-[70%] xl:h-[90%] space-y-3 overflow-y-auto">
                      {loadedCategories?.data?.map((category: TCategory) => (
                        <div
                          key={category.category}
                          className="flex justify-start items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            value={category.category}
                            checked={selectedCategories.includes(
                              category.category
                            )}
                            onChange={handleCheckboxCheckChange}
                          />
                          <p>{category.category}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-[25%] p-5 flex flex-col justify-center border-y">
                    <h2 className="text-[#757575] text-lg font-semibold">
                      Filter by price
                    </h2>

                    <MultiRangeSlider
                      min={defaultMin}
                      max={defaultMax}
                      onChange={handlePriceSliderChange}
                    />

                    <div className="flex justify-between items-center">
                      <p>${minProductPrice}</p>-<p>${maxProductPrice}</p>
                    </div>
                  </div>

                  <div className="h-[25%] p-5 flex flex-col justify-center">
                    <h2 className="text-[#757575] text-lg font-semibold">
                      Filter by rating
                    </h2>
                    <MultiRangeSlider
                      min={0}
                      max={5}
                      step={0.5}
                      onChange={handleRatingSliderChange}
                    />
                    <div className="flex justify-between items-center">
                      <p>{ratingRangeValue[0]}</p>-<p>{ratingRangeValue[1]}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-[80%] h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 overflow-y-auto">
              {/* <ProductsContainer> */}
              {loadingProducts || loadingNumberOfProducts ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : products?.length > 0 ? (
                <>
                  {products
                    .filter(
                      (product) =>
                        product.rating >= ratingRangeValue[0] &&
                        product.rating <= ratingRangeValue[1]
                    )
                    .map((product: TProduct) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
              {/* </ProductsContainer> */}
            </div>
          </div>

          <div className="w-fit h-[5%] mx-auto">
            {/* </Pagination> */}
            <Pagination
              loadingDataLength={loadingNumberOfProducts}
              dataLength={numberOfProducts}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;

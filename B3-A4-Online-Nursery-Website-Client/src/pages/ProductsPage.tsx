import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/ProductsPageAndListSection/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import SiteTitle from "@/components/shared/SiteTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import productApi from "@/redux/api/ProductApi";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { TCategory } from "@/types/category.type";
import categoryApi from "@/redux/api/CategoryApi";

const ProductsPage = () => {
  const loadedCategory = useParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(loadedCategory?.category);

  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery(category);

  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery(undefined);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Container>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
          <SiteTitle title={"Products"}></SiteTitle>

          <div className="w-full flex items-center gap-6">
            <div className="flex-1 flex items-center gap-4">
              <Label htmlFor="search" className="text-left text-[#757575]">
                Search
              </Label>
              <Input
                type="text"
                id="search"
                placeholder="Tile, Category"
                className="col-span-3"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></Input>
            </div>

            <Select
              required
              onValueChange={(value) => setCategory(value as string)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {loadingCategories ? (
                    <Loading></Loading>
                  ) : categories.data.length <= 0 ? (
                    <NoData text={"No Categories found"}></NoData>
                  ) : (
                    categories.data.map((category: TCategory) => (
                      <SelectItem key={category._id} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {loadingProducts ? (
            <Loading></Loading>
          ) : products!.data?.length > 0 ? (
            <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-auto">
              {products!.data
                ?.filter((product: TProduct) => {
                  return search.toLowerCase() === ""
                    ? product
                    : product.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        product.category
                          .toLowerCase()
                          .includes(search.toLowerCase());
                })
                .map((product: TProduct) => (
                  <Link to={`/product-details/${product?._id}`}>
                    <ProductCard key={product._id} product={product} />
                  </Link>
                ))}
            </div>
          ) : (
            <NoData text={"No Products Found"}></NoData>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;

import categoryApi from "@/redux/api/CategoryApi";
import Container from "../../layouts/rootLayout/Container";
import Loading from "../../shared/Loading";
import { TCategory } from "@/types/category.type";
import NoData from "../../shared/NoData";
import SiteTitle from "../../shared/SiteTitle";
import CategoryCards from "./CategoryCards";

const CategorySection = () => {
  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery(undefined);

  return (
    <div className="flex justify-center items-center py-10">
      <Container>
        <div className="flex flex-col justify-center items-center gap-16">
          <SiteTitle title={"Categories"}></SiteTitle>

          {loadingCategories ? (
            <Loading></Loading>
          ) : categories!.data?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {categories!.data?.map((category: TCategory) => (
                <CategoryCards
                  key={category?._id}
                  category={category}
                ></CategoryCards>
              ))}
            </div>
          ) : (
            <NoData text={"No Category Found"}></NoData>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategorySection;

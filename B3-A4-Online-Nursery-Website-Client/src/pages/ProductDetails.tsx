import Loading from "@/components/shared/Loading";
import productApi from "@/redux/api/ProductApi";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const loadedId = useParams();

  const { isLoading: loadingProduct, data: product } =
    productApi.useGetSingleProductQuery(loadedId._id);

  if (loadingProduct) {
    return <Loading></Loading>;
  } else return <div>{product?.data.title}</div>;
};

export default ProductDetails;

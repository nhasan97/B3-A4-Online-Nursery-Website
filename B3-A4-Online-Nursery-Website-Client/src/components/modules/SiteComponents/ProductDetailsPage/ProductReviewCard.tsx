import StarRating from "@/components/shared/StarRating";
import { TUserExtended } from "@/types/auth.type";
import { TReview } from "@/types/review.type";

const ProductReviewCard = ({ review }: { review: TReview }) => {
  const { user, say, rating } = review;

  const { imageUrl, name } = user as TUserExtended;

  return (
    <div className="w-full flex flex-col justify-center">
      <img
        src={imageUrl}
        className="size-[100px] mx-auto object-cover object-center rounded-full border-4 border-white translate-y-1/2 z-10 shadow-2xl"
      />

      <div className="w-full py-20 px-5 bg-[#B0C3B1] text-[#202634] text-center rounded-lg">
        <h2 className="font-bold text-2xl">{name}</h2>

        <p className="text-preview text-center" title={say}>
          {say}
        </p>
      </div>

      <div className="px-5 py-2 mx-auto bg-[#202634] rounded-full -translate-y-1/2 shadow-2xl">
        <StarRating rating={rating}></StarRating>
      </div>
    </div>
  );
};

export default ProductReviewCard;

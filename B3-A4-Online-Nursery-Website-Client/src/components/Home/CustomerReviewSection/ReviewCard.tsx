import StarRating from "@/components/shared/StarRating";
import { TReview } from "@/types/review.type";

const ReviewCard = ({ review }: { review: TReview }) => {
  const { image, name, say, rating } = review;

  return (
    <div className="w-fit mx-auto bg-[#ECF1EC] flex flex-col justify-center items-center mb-10 shadow-2xl">
      <img
        src={image}
        className="size-[120px] object-cover object-center rounded-full border-4 border-white translate-y-1/2 z-10 shadow-2xl"
      />

      <div className="py-20 px-5 bg-[#B0C3B1] text-[#202634] text-center rounded-lg">
        <h2 className="font-bold text-2xl">{name}</h2>

        <p className="text-preview text-center" title={say}>
          {say}
        </p>
      </div>

      <div className="px-5 py-2 bg-[#202634] rounded-full -translate-y-1/2 shadow-2xl">
        <StarRating rating={rating}></StarRating>
      </div>
    </div>
  );
};

export default ReviewCard;

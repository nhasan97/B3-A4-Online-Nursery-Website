/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { IoIosSave } from "react-icons/io";
import reviewApi from "@/redux/api/reviewApi";
import { catchAsync } from "@/utils/catchAsync";
import { REVIEW_TYPE, TReview } from "@/types/review.type";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rating } from "@smastrom/react-rating";

const PostReviewModal = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let decodedUserInfo: any;

  if (token) {
    decodedUserInfo = verifyToken(token);
  }

  const [rating, setrating] = useState(0);
  const [say, setSay] = useState("");

  const [addReview] = reviewApi.useAddReviewMutation();

  const handleAddCategory = catchAsync(async (e: FormEvent) => {
    e.preventDefault();

    const reviewDetails: TReview = {
      user: (decodedUserInfo as TUser).id,
      rating,
      say,
      type: REVIEW_TYPE.Overall,
    };
    const res = await addReview(reviewDetails).unwrap();

    displaySuccessToast(res);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#98b2992f] text-base md:text-lg text-[#5D7E5F] hover:text-[#98b299] rounded-full">
          Let us know your thoughts!
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <p className="text-2xl font-medium">Review</p>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleAddCategory(e)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-left text-[#757575]">
              Rating
            </Label>

            <Rating
              style={{ width: 180 }}
              isRequired
              value={rating}
              visibleLabelId="cleanliness_rating"
              onChange={(selectedValue: number) => setrating(selectedValue)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="say" className="text-left text-[#757575]">
              Your thought
            </Label>
            <Input
              id="say"
              className="col-span-3"
              required
              onBlur={(e) => setSay(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </DialogFooter>
        </form>
        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PostReviewModal;

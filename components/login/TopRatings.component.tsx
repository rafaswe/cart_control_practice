import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { TopRatingsInfoProps } from "../constant/type";

const TopRatings = ({ ratingsInfo }: { ratingsInfo: TopRatingsInfoProps }) => {
  const { ratings, description, userInfo } = ratingsInfo;
  const { image, name, proffession } = userInfo;
  return (
    <div className="flex flex-col gap-3">
      <div>
        <ReactStars
          count={ratings?.outOf}
          value={ratings?.total}
          size={24}
          edit={false}
          activeColor="#ffd700"
          color="#ffffff"
          isHalf={true}
        />
        <p>{`"${description}"`}</p>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt="profile"
          width={42}
          height={42}
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm">{proffession}</p>
        </div>
      </div>
    </div>
  );
};
export default TopRatings;

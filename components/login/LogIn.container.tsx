"use client";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { TopRatingsInfo } from "../constant/enum";
import { TopRatingsInfoProps } from "../constant/type";
const LogIn = () => {
  return (
    <div className="grid grid-cols-2 w-full min-h-[100vh]">
      <div className="col-span-2 md:col-span-1 bg-primary relative overflow-hidden flex items-center justify-center">
        {/* Detials Section  */}
        <div className="h-full py-12 md:h-4/6 md:py-0 w-10/12 lg:w-9/12 2xl:w-1/2 flex flex-col justify-between text-white ">
          <div className="flex flex-col gap-3">
            <div className=" text-3xl lg:text-6xl xl:text-8xl flex flex-col font-bold break-words ">
              <p>Welcome to</p>
              <p>our community</p>
            </div>
            <p className="xl:text-md leading-7">
              Clarity gives you the blocks & components you need to create a
              truly professional website.
            </p>
          </div>
          <TopRatings ratingsInfo={TopRatingsInfo} />
        </div>

        {/* Line Designs  */}
        <div className="absolute border-8 border-border -top-36 md:-top-20 w-[25rem] -left-[200px] h-[200px] rounded-b-full -rotate-12"></div>
        <div className="absolute border-8 border-white -bottom-64 md:-bottom-52 2xl:-bottom-40 w-[35rem] -right-[250px]  md:-right-[200px] h-[300px] rounded-t-full -rotate-12"></div>
      </div>

      {/* Form section  */}
      <div className="col-span-2 md:col-span-1 flex flex-col  justify-center ">
        <div className="md:h-4/6 my-auto w-1/2 ml-[15%] ">
          <div className="flex flex-col gap-2">
            <p className=" text-3xl lg:text-6xl xl:text-[52px] flex flex-col font-bold break-words ">
              Welcome back!
            </p>
            <p className="text-md text-brand-1 leading-8">
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
export default LogIn;

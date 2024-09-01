"use client";
import { TopRatingsInfo } from "../constant/enum";
import LoginForm from "./LogInForm.component";
import TopRatings from "./TopRatings.component";
const LogIn = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-y-6 min-h-[100vh]">
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
        <div className="absolute border-8 border-border-1 -top-36 md:-top-20 w-[25rem] -left-[200px] h-[200px] rounded-b-full -rotate-12"></div>
        <div className="absolute border-8 border-white -bottom-64 md:-bottom-52 2xl:-bottom-48 w-[35rem] -right-[250px]  md:-right-[200px] h-[300px] rounded-t-full -rotate-12"></div>
      </div>

      {/* Form section  */}
      <div className="col-span-2 md:col-span-1 flex flex-col pb-8 md:pb-0   justify-center ">
        <div className="md:h-4/6 flex flex-col h-full justify-between  my-auto gap-y-4 md:gap-0 w-10/12 md:w-9/12 lg:w-1/2 md:ml-[15%] md:mr-0 mx-auto">
          <div className="flex flex-col gap-2">
            <p className="text-xl md:text-3xl lg:text-6xl xl:text-[52px] flex flex-col font-bold break-words ">
              Welcome back!
            </p>
            <p className="text-sm md:text-md text-brand-1 md:leading-8">
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

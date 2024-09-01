const Skeleton = () => {
  return (
    <div className="px-[5%] w-full flex-1">
      <div className="w-full lg:w-10/12 flex flex-col gap-6">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <p className="w-56 h-10 bg-slate-100 rounded-lg animate-pulse"></p>
          <p
            className={`font-semibold md:text-base text-sm text-white  w-40 h-12 rounded-lg bg-slate-100 animate-pulse`}></p>
        </div>

        <div className="h-96 w-full bg-slate-100 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

export default Skeleton;

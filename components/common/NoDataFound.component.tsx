import Image from "next/image";

const NoDataFoundComponent = () => {
  return (
    <div className="flex h-[600px] flex-col w-full items-center justify-center rounded-xl bg-white">
      <Image
        src={"/images/noDataFound.svg"}
        alt="Empty Data"
        width={160}
        height={160}
        className="w-1/2 mx-auto h-[200px]"
      />
      <p>No Data Found</p>
    </div>
  );
};
export default NoDataFoundComponent;

import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  className?: string;
}
const Spinner = ({ className = "" }: SpinnerProps) => {
  return (
    <div className="flex w-fit items-center justify-center">
      <div
        className={twMerge(
          `inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-brand-3 text-opacity-50 motion-reduce:animate-[spin_1.]`,
          className
        )}></div>
    </div>
  );
};

export default Spinner;

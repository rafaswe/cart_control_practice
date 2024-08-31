import { format } from "date-fns";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, UseFormSetValue } from "react-hook-form";

interface CustomDatePickerType {
  controllerName: string;
  control: any;
  errors: any;
  setValue: UseFormSetValue<any>;
  placeholderText?: string;
  label?: string;
  labelClass?: string;
  dependentField?: string;
  mendatory?: boolean;
}
export const CustomDatePicker = ({
  controllerName,
  control,
  errors,
  setValue,
  placeholderText = "Select a Date",
}: CustomDatePickerType) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const calenderRef = useRef(null);
  const handleIconClick = () => {
    if (!isCalenderOpen) {
      setIsCalenderOpen(true);
    }
  };
  //   useOnClickOutside(calenderRef, () => {
  //     setIsCalenderOpen(false);
  //   });

  const handleDateChange = (date) => {
    const modifiedDate = new Date(date);
    const formattedDate = format(modifiedDate, "dd-MM-yyyy");
    console.log(formattedDate);
    setValue(controllerName, formattedDate);
  };
  return (
    <div className="w-full relative z-50 " ref={calenderRef}>
      <div className="single-date-input  w-full rounded-lg focus:outline-none">
        <Controller
          control={control}
          name={controllerName}
          render={({ field }) => {
            const selectedDate = field.value ? new Date(field.value) : null;
            return (
              <div
                className="relative w-full z-50"
                onClick={() => {
                  handleIconClick();
                }}>
                <DatePicker
                  dropdownMode="select"
                  placeholderText={placeholderText ?? "dd/mm/yyyy"}
                  readOnly
                  onChange={(date) => {
                    setIsCalenderOpen(false);

                    handleIconClick();
                    handleDateChange(date);
                  }}
                  dateFormat="dd MMM, YYYY"
                  selected={selectedDate}
                  className={`h-10  w-full cursor-pointer  z-100 rounded-lg border border-[#DDDDDD] bg-white pl-3 pr-2 text-sm focus:outline-none sm:h-12 md:text-base`}
                  minDate={new Date()}
                  open={isCalenderOpen}
                  popperClassName="md:w-fit w-[220px] text-xs md:text-sm mt-1 -ml-6 sm:-ml-0  box-content h-full"
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

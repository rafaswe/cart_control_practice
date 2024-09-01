import moment from "moment";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const CustomDatePicker = ({
  control,
  name,
  error,
  index,
  placeholder = "",
  format = "DD-MM-YYYY",
  isClearable = false,
  showTimeInput = false,
  min,
  ...otherProps
}) => {
  const formatDate = (date) => {
    if (!showTimeInput) {
      const current = new Date();
      date.setHours(current.getHours());
      date.setMinutes(current.getMinutes());
      date.setSeconds(current.getSeconds());
    }
    return moment(date).format("MM-DD-YYYY");
  };

  const generateDateVal = (date) =>
    !date ? null : typeof date === "string" ? new Date(date) : date;

  const handleChange = (date, handler) => {
    if (!date) {
      handler(date);
      return;
    }

    handler(formatDate(date));
  };

  return (
    <div className={`w-full h-full`}>
      <div
        className={`col-lg-12 w-full h-full p-2 border-2  rounded-lg ${
          error ? "border-error" : "border-secondary-tint"
        }`}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="w-100 h-full">
              <DatePicker
                {...otherProps}
                className={`focus:outline-none h-full w-full ${
                  index % 2 !== 0 && "bg-brand-5"
                }`}
                minDate={min}
                dateFormat={format}
                placeholderText={placeholder || format}
                isClearable={isClearable}
                selected={
                  value && typeof value === "string" ? new Date(value) : value
                }
                onChange={(date) => handleChange(date, onChange)}
                value={value && moment(value).format("DD MMM, YYYY")}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// Define the Zod schema for validation
const transactionSchema = z.object({
  transactions: z.array(
    z.object({
      items: z.string().nonempty("Items is required"),
      store: z.string().nonempty("Store is required"),
      runnersName: z.string().nonempty("Runner's Name is required"),
      amount: z
        .number()
        .min(1, "Amount must be greater than 0")
        .or(z.string().regex(/^\d+$/, "Amount must be a number")),
      cardNo: z
        .string()
        .regex(/^\d+$/, "Card No must be a number")
        .nonempty("Card No is required"),
      transactionDate: z
        .date()
        .nullable()
        .refine((val) => val, "Date is required"),
    })
  ),
});

const ModalTransactionTable = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactions: [
        {
          items: "",
          store: "",
          runnersName: "",
          amount: 0,
          cardNo: "",
          transactionDate: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <div className="lg:overflow-x-hidden  overflow-x-auto max-h-[200px] ">
        <table className="w-full mx-auto">
          <thead>
            <tr>
              <th className="py-4 bg-brand-5 border ">Items</th>
              <th className="py-4 bg-brand-5 border ">Store</th>
              <th className="py-4 bg-brand-5 border ">{`Runner's Name`}</th>
              <th className="py-4 bg-brand-5 border ">Amount</th>
              <th className="py-4 bg-brand-5 border ">Card No</th>
              <th className="py-4 bg-brand-5 border ">Transaction Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr
                key={field.id}
                className={`${index % 2 !== 0 && "bg-brand-5"}`}>
                <td className="border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.items`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 w-10/12 min-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.items &&
                          "border-red-500"
                        }`}
                        placeholder="Items"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.store`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 w-10/12 min-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.store &&
                          "border-red-500"
                        }`}
                        placeholder="Store"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.runnersName`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 w-10/12 min-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.runnersName &&
                          "border-red-500"
                        }`}
                        placeholder="Runner's Name"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.amount`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className={`border p-2.5 max-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.amount &&
                          "border-red-500"
                        }`}
                        placeholder="Amount"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.cardNo`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 max-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.cardNo &&
                          "border-red-500"
                        }`}
                        placeholder="Card No"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.transactionDate`}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd MMM, yyyy"
                        placeholderText="Select a Date"
                        className={`border w-10/12 p-2.5  focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.transactionDate &&
                          "border-red-500"
                        }`}
                        isClearable
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </td>
                <td className="bg-white">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex items-center justify-center">
                    <Image
                      src="/images/delete.svg"
                      alt="Add Btn"
                      width={32}
                      height={32}
                      className="pl-2"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() =>
          append({
            items: "",
            store: "",
            runnersName: "",
            amount: 0,
            cardNo: "",
            transactionDate: null,
          })
        }
        className="borderb">
        Add Transaction
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

export default ModalTransactionTable;

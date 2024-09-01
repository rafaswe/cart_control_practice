import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import CustomDatePicker from "./CustomDatePicker.component";

// Define the Zod schema for validation
const transactionSchema = z.object({
  transactions: z.array(
    z.object({
      line_item_name: z
        .string()
        .max(200, "Line item name must be at most 200 characters")
        .refine((val) => val && val.length > 0, "Item Name is required"),
      store: z
        .string()
        .max(200, "Store name must be at most 200 characters")
        .refine((val) => val && val.length > 0, "Store is required"),
      runners_name: z
        .string()
        .max(200, "Runner's name must be at most 200 characters")
        .refine((val) => val && val.length > 0, "Runner's name is required"),
      amount: z
        .union([
          z.number().min(1, "Amount must be greater than 0"),
          z.string().regex(/^\d+$/, "Amount must be a numeric value"),
        ])
        .refine((val) => typeof val === "number" || /^\d+$/.test(val), {
          message: "Amount must be a numeric value",
        }),
      card_number: z
        .string()
        .length(5, "Card number must be exactly 5 digits")
        .regex(/^\d+$/, "Card number must be numeric")
        .refine((val) => val && val.length > 0, "Card number is required"),

      transaction_date: z
        .string()
        .nonempty("Transaction date is required")
        .refine(
          (val) => /^\d{2}-\d{2}-\d{4}$/.test(val),
          "Date must be in mm-dd-yyyy format"
        ),
    })
  ),
});

const ModalTransactionTable = ({ setTransactionData, setIsModalOpen }) => {
  const [hasError, setHasError] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactions: [
        {
          line_item_name: "",
          store: "",
          runners_name: "",
          amount: 0,
          card_number: "",
          transaction_date: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const onSubmit = async (data) => {
    if (data?.transactions?.length > 0) {
      setHasError(false);
      try {
        const response = await fetch(
          "https://devapi.propsoft.ai/api/auth/interview/material-purchase",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ material_purchase: data.transactions }),
          }
        );

        if (response.ok) {
          await response.json().then(() => {
            setTransactionData(data.transactions);
            setIsModalOpen(false);
          });
        } else {
        }
      } catch (error) {}
    } else setHasError(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4">
      <div className="overflow-x-auto text-sm w-full pb-3 max-h-[250px]">
        {/* table Segment  */}
        <div className="grid grid-cols-12 w-[1500px] text-brand-2 font-semibold xl:w-full min-w-[1500px] xl:min-w-fit">
          <div className="col-span-2 py-1 md:py-3  bg-brand-5 border border-secondary-tint text-center">
            Items*
          </div>
          <div className="col-span-2 py-1 md:py-3 bg-brand-5 border border-secondary-tint text-center">
            Store*
          </div>
          <div className="col-span-2 py-1 md:py-3 bg-brand-5 border border-secondary-tint text-center">
            {`Runner's Name`}
          </div>
          <div className="col-span-1 py-1 md:py-3 bg-brand-5 border border-secondary-tint text-center">
            Amount*
          </div>
          <div className="col-span-2 py-1 md:py-3 bg-brand-5 border border-secondary-tint text-center">
            Card No*
          </div>
          <div className="col-span-2 py-1 md:py-3 bg-brand-5 border border-secondary-tint text-center">
            Transaction Date*
          </div>
          <div className=""></div>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`${
              index % 2 !== 0 && "bg-brand-5"
            } grid grid-cols-12  w-[1500px] xl:w-full min-w-[1500px] xl:min-w-fit`}>
            <div className="border border-secondary-tint col-span-2 p-2  text-center">
              <Controller
                control={control}
                name={`transactions.${index}.line_item_name`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`border-2  p-2.5 w-11/12 focus:outline-none rounded-lg ${
                      errors.transactions?.[index]?.line_item_name
                        ? "border-error"
                        : "border-secondary-tint"
                    }`}
                    placeholder="Items"
                  />
                )}
              />
            </div>
            <div className="p-2 border border-secondary-tint col-span-2  text-center">
              <Controller
                control={control}
                name={`transactions.${index}.store`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`border-2  p-2.5 w-11/12 focus:outline-none rounded-lg ${
                      errors.transactions?.[index]?.store
                        ? "border-error"
                        : "border-secondary-tint"
                    }`}
                    placeholder="Store"
                  />
                )}
              />
            </div>
            <div className="p-2 border border-secondary-tint col-span-2  text-center">
              <Controller
                control={control}
                name={`transactions.${index}.runners_name`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`border-2 p-2.5 w-11/12 focus:outline-none rounded-lg ${
                      errors.transactions?.[index]?.runners_name
                        ? "border-error"
                        : "border-secondary-tint"
                    }`}
                    placeholder="Runner's Name"
                  />
                )}
              />
            </div>
            <div className="p-2 border border-secondary-tint flex items-center gap-0.5 col-span-1  text-center">
              <p>$</p>
              <Controller
                control={control}
                name={`transactions.${index}.amount`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={`border-2  p-2.5 w-11/12 focus:outline-none rounded-lg ${
                      errors.transactions?.[index]?.amount
                        ? "border-error"
                        : "border-secondary-tint"
                    }`}
                    placeholder="Amount"
                  />
                )}
              />
            </div>
            <div className="p-2 border border-secondary-tint col-span-2  text-center">
              <Controller
                control={control}
                name={`transactions.${index}.card_number`}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`border-2 p-2.5 w-11/12 focus:outline-none rounded-lg ${
                      errors.transactions?.[index]?.card_number
                        ? "border-error"
                        : "border-secondary-tint"
                    }`}
                    placeholder="Card No"
                  />
                )}
              />
            </div>
            <div className="p-2 border border-secondary-tint col-span-2  text-center ">
              <CustomDatePicker
                name={`transactions.${index}.transaction_date`}
                placeholder="Select a date"
                control={control}
                isRequired={true}
                index={index}
                showTimeInput={true}
                isRangePicker={false}
                error={!!errors.transactions?.[index]?.transaction_date}
                isClearable
                position="4/8"
                min={new Date()}
              />
            </div>
            <div className="bg-white p-2 col-span-1 flex items-center">
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center">
                <Image
                  src="/images/delete.svg"
                  alt="Delete Btn"
                  width={32}
                  height={32}
                  className="pl-2"
                />
              </button>
            </div>
          </div>
        ))}
        <div className="pt-5 grid grid-cols-12 w-full  justify-end">
          <div className="col-span-11 flex lg:justify-end">
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                append({
                  line_item_name: "",
                  store: "",
                  runners_name: "",
                  amount: 0,
                  card_number: "",
                  transaction_date: null,
                });
              }}
              className="">
              <Image src="/images/add.svg" alt="Add" width={32} height={32} />
            </button>
          </div>
          <div></div>
        </div>
      </div>
      <div className="text-error">
        {hasError ? <p>At least One Item Has to be Set</p> : <p></p>}
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-11 flex justify-end">
          <button
            type="submit"
            className="px-8 md:px-10 py-2 md:py-3 bg-primary text-white rounded-lg ">
            Save
          </button>
        </div>
        <div></div>
      </div>
    </form>
  );
};

export default ModalTransactionTable;

import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { CustomDatePicker } from "./CustomDatePicker";

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
          const result = await response.json();
          console.log("Submission successful:", result);
          setTransactionData(data.transactions);
          setIsModalOpen(false);
        } else {
          console.error("Submission failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        // Handle error (e.g., display an error message)
      }
    } else setHasError(true);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6">
      <div className="lg:overflow-x-hidden  overflow-x-auto max-h-[250px] ">
        <table className="w-full mx-auto shadow-lg overflow-visible">
          <thead className="overflow-visible">
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
          <tbody className="overflow-visible">
            {fields.map((field, index) => (
              <tr
                key={field.id}
                className={`${index % 2 !== 0 && "bg-brand-5"}`}>
                <td className="border">
                  <Controller
                    control={control}
                    name={`transactions.${index}.line_item_name`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 w-10/12 min-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.line_item_name &&
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
                    name={`transactions.${index}.runners_name`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 w-10/12 min-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.runners_name &&
                          "border-red-500"
                        }`}
                        placeholder="Runner's Name"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border flex gap-1 items-center">
                  <p>$</p>
                  <Controller
                    control={control}
                    name={`transactions.${index}.amount`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className={`border p-2.5 max-w-[100px] focus:outline-none rounded-lg ${
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
                    name={`transactions.${index}.card_number`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`border p-2.5 max-w-[80px] focus:outline-none rounded-lg ${
                          errors.transactions?.[index]?.card_number &&
                          "border-red-500"
                        }`}
                        placeholder="Card No"
                      />
                    )}
                  />
                </td>
                <td className="p-2 border ">
                  <CustomDatePicker
                    control={control}
                    setValue={setValue}
                    errors={errors}
                    controllerName={`transactions.${index}.transaction_date`}
                  />
                </td>
                <td className="bg-white">
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
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-r-0"></td>
              <td className="border-y"></td>
              <td className="border-y"></td>
              <td className="border-y"></td>
              <td className="border-y"></td>
              <td className=" py-2 pr-3 flex justify-end border border-l-0">
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
                  <Image
                    src="/images/add.svg"
                    alt="Add"
                    width={32}
                    height={32}
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-error">
        {hasError ? <p>At least One Item Has to be Set</p> : <p></p>}
      </div>
      <div className="self-end mr-9">
        <button
          type="submit"
          className="px-10 py-3 bg-primary text-white rounded-lg">
          Save
        </button>
      </div>
    </form>
  );
};

export default ModalTransactionTable;

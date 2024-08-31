"use client";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalTransactionTable from "./ModalTransectionTable.container";

const MaterialPurchaseContainer = () => {
  //state
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);

  //hooks
  const email = useSelector((state: RootState) => state.auth.email);
  const token = useSelector((state: RootState) => state.auth.token);

  //Actions
  const handleAddMaterial = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchMaterialPurchases = async () => {
      try {
        const response = await fetch(
          "https://devapi.propsoft.ai/api/auth/interview/material-purchase",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch material purchases");
        }

        const data = await response.json();
        setTableData(data?.material_purchase_list?.data); // Assuming the API returns an array of transactions
      } catch (error) {
        console.error("Error fetching material purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialPurchases();
  }, [transactionData, token]);

  return (
    <div className="w-full flex flex-col gap-16">
      {/* nav bar  */}
      <div className="h-[91px] w-full shadow-lg flex pl-[5%] items-center">
        {email ? (
          <div className="flex gap-4 items-center px-3  py-3 bg-brand-3 rounded-xl shadow-lg">
            <Image
              src="/images/profileVector.svg"
              alt="profile"
              width={36}
              height={36}
            />
            <p className="text-brand-2 text-sm">{email}</p>
          </div>
        ) : null}
      </div>
      {/* Purchase List  */}
      <div className="px-[5%] w-full flex-1">
        <div className="w-10/12 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-semibold text-primary">
              Material Purchase
            </p>
            <button
              className="font-semibold text-white bg-primary px-6 py-3.5 rounded-lg"
              onClick={handleAddMaterial}>
              Add Material Purchase
            </button>
          </div>

          <TransactionTable tableData={tableData} />
        </div>
      </div>
      {isModalOpen && (
        <button
          className="fixed inset-0 bg-black w-full bg-opacity-50 flex justify-center items-center z-40"
          onClick={handleCloseModal}>
          <button
            className="bg-white border-b-[18px] border-b-primary w-10/12 rounded-lg"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg py-4 bg-primary text-white font-semibold ">
              Material Purchase
            </h2>
            {/* Add your form or content here */}
            <div className="py-6">
              {/* Data section */}
              <div className="w-11/12 mx-auto">
                {/* Wrapping div to control overflow */}
                <div className="">
                  <ModalTransactionTable
                    setTransactionData={setTransactionData}
                    setIsModalOpen={setIsModalOpen}
                  />
                </div>
              </div>
            </div>
          </button>
        </button>
      )}
    </div>
  );
};

const TransactionTable = ({ tableData }) => {
  //Action
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return format(date, "dd MMM, yyyy");
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#7A9FF0] text-white ">
            <th className="p-3.5 border border-white text-center font-semibold">
              NAME
            </th>
            <th className="p-3.5 border border-white text-center font-semibold">
              STORE
            </th>
            <th className="p-3.5 border border-white text-center font-semibold">
              {`Runner's Name`}
            </th>
            <th className="p-3.5 border border-white text-center font-semibold">
              AMOUNT
            </th>
            <th className="p-3.5 border border-white text-center font-semibold">
              CARD NO.
            </th>
            <th className="p-3.5 border border-white text-center font-semibold">
              TRANSACTION DATE
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData ? (
            <Fragment>
              {tableData?.map((transaction, index) => {
                const {
                  id,
                  line_item_name,
                  store,
                  runners_name,
                  amount,
                  card_number,
                  transaction_date,
                } = transaction;
                return (
                  <tr
                    key={id}
                    className={index % 2 !== 0 ? "bg-[#E3E9F7]" : "bg-white"}>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {line_item_name}
                    </td>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {store}
                    </td>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {runners_name}
                    </td>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      ${amount}
                    </td>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {card_number}
                    </td>
                    <td className="p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {formatDate(transaction_date)}
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          ) : (
            <div></div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialPurchaseContainer;

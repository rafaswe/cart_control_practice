"use client";
import { useApiRequest } from "@/hooks/useApiRequest";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NoDataFoundComponent from "../common/NoDataFound.component";
import Skeleton from "../common/Skeleton";
import ModalTransactionTable from "./ModalTransectionTable.container";

const MaterialPurchaseContainer = () => {
  //state
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(1);

  //hooks
  const email = useSelector((state: RootState) => state.auth.email);
  const { makeRequest, isLoading } = useApiRequest();

  //Actions
  const handleAddMaterial = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (event) => {
    const newPageNum = Number(event.target.value);
    if (newPageNum > -1) setPage(event.target.value);
  };

  //Effects
  useEffect(() => {
    const fetchMaterialPurchases = async () => {
      try {
        await makeRequest({
          endpoint: `auth/interview/material-purchase?page=${page}`,
          method: "GET",
          privateRoute: true,
          onSuccess: (data) => {
            setTableData(data?.material_purchase_list?.data || []);
            setTotalItems(data?.material_purchase_list?.total);
          },
          onError: () => {
            toast.error("Something went wrong...");
          },
        });
      } catch (error) {
        toast.error("Please Log in Again..");
      } finally {
      }
    };

    fetchMaterialPurchases();
  }, [transactionData, page]);

  return (
    <div className="w-full flex flex-col gap-4 pb-16 md:gap-16">
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
      {!isLoading ? (
        <div className="px-[5%] w-full flex-1">
          <div className="w-full lg:w-10/12 flex flex-col gap-6">
            <div className="flex md:flex-row flex-col justify-between items-center">
              <p className="text-2xl md:text-4xl font-semibold text-primary">
                Material Purchase
              </p>
              <button
                className={`font-semibold md:text-base text-sm text-white  px-3 md:px-6 py-2 md:py-3.5 rounded-lg ${
                  tableData.length === 0 ? "bg-slate-100" : "bg-primary "
                }`}
                onClick={handleAddMaterial}
                disabled={tableData.length === 0}>
                Add Material Purchase
              </button>
            </div>

            <TransactionTable tableData={tableData} />
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
      <div className="px-[5%] w-full flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor="pageNumber" className="md:text-lg font-semibold">
            Page:
          </label>
          <input
            id="pageNumber"
            type="number"
            value={page}
            min={0}
            onChange={handlePageChange}
            className="border border-gray-300 rounded-md focus:outline-none px-2 py-1 w-16"
          />
          {totalItems && tableData?.length > 0 ? (
            <div>
              Showing {tableData?.length} from {totalItems}
            </div>
          ) : null}
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

            <div className="py-6">
              <div className="w-11/12 mx-auto">
                <div className="">
                  <ModalTransactionTable
                    setTransactionData={setTransactionData}
                    setIsModalOpen={setIsModalOpen}
                    setPage={setPage}
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
    if (!dateStr) return "Invalid Date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return format(date, "dd MMM, yyyy");
  }

  return (
    <div className="overflow-x-auto md:text-base text-sm">
      {tableData.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#7A9FF0] text-white ">
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                NAME
              </th>
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                STORE
              </th>
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                {`Runner's Name`}
              </th>
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                AMOUNT
              </th>
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                CARD NO.
              </th>
              <th className="p-1 md:p-3.5 border border-white text-center font-semibold">
                TRANSACTION DATE
              </th>
            </tr>
          </thead>
          <tbody>
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
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {line_item_name}
                    </td>
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {store}
                    </td>
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {runners_name}
                    </td>
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      ${amount}
                    </td>
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {card_number}
                    </td>
                    <td className="p-2 md:p-3.5 border border-white text-center text-brand-4 font-semibold">
                      {formatDate(transaction_date) ?? transaction_date}
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          </tbody>
        </table>
      ) : (
        <NoDataFoundComponent />
      )}
    </div>
  );
};

export default MaterialPurchaseContainer;

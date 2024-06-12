import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

import PaymentPageDetail from "./PaymentPageDetails";
import Loading from "../components/Loading"
import {  Table } from "flowbite-react";
import { formatPrice } from "../components/Function";
interface PaymentData {
  id: string;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  paymentDate: string;
  paymentAmount: number;
  debtId: string;
  userId: string;
}
const PaymentPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
 const [loading, setLoading] = useState<boolean>(false)
  const fetchPayment = async (): Promise<void> => {
    try {
    setLoading(true)
      const res = await fetch(
        `https://study.logiper.com/finance/payment-plans/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data}`,
          },
        }
      );

      const data = await res.json();
     
      setPaymentData(data.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  console.log(paymentData, "paymentData");

  const handleChange = async (id:string):Promise<void> => {

      const paymentIndex = paymentData.findIndex(
        (item) => item.id === id
      );
      if (paymentIndex === -1) return;
console.log("paymentInde", paymentIndex)
      const paymentValue = paymentData[paymentIndex];
      const updatedPayment = {
        ...paymentValue,
        isPaid: true,
      };

      const formData = {
        paymentDate: updatedPayment.paymentDate,
        paymentAmount: updatedPayment.paymentAmount,
        isPaid: updatedPayment.isPaid,
      };
  

    try {
      const res = await fetch(
        `https://study.logiper.com/finance/payment-plans/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.data}`,
          },
          body:JSON.stringify(formData)
        }
      );

      const data = await res.json();
      console.log(data)
      const newPaymentData = [...paymentData];
      newPaymentData[paymentIndex] = updatedPayment;
      setPaymentData(newPaymentData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PaymentPageDetail id={id} />
      <>
        {loading ? (
          <Loading />
        ) : (
          <div
            className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  max-w-6xl
    scrollbar-track-slate-100 scroll-bar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
          >
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Payment Date</Table.HeadCell>
                <Table.HeadCell>CreateAt Date</Table.HeadCell>
                <Table.HeadCell>UpdateAt Date</Table.HeadCell>
                <Table.HeadCell>Payment Amount </Table.HeadCell>
                <Table.HeadCell>Debt Amount</Table.HeadCell>
                <Table.HeadCell>Payment Debt</Table.HeadCell>
              </Table.Head>

              {paymentData?.map((item) => (
                <Table.Body key={item.id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700  dark:bg-gray-800">
                    <Table.Cell>
                      {" "}
                      {new Date(item.paymentDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Table.Cell>{" "}
                    <Table.Cell>
                      {" "}
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {formatPrice(item.paymentAmount)}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {item.isPaid ? (
                        <span className="capitalize text-emerald-500 font-semibold">
                          ödendi
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold capitalize">
                          ödenmedi
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          disabled={item.isPaid}
                          checked={item.isPaid}
                          onChange={() => handleChange(item.id)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-emerald-600" />
                      </label>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        )}
      </>
    </>
  );
};

export default PaymentPage;

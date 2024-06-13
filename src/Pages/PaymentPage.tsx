import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnDebt";
import PaymentPageDetail from "./PaymentPageDetails";
import Loading from "../components/Loading";

import {PaymentData} from "../types/interfaces"
import { Helmet } from "react-helmet";
import PaymentTable from "./PaymentTable";
import Error from "../components/Error";
const PaymentPage = () => {
  const { id } = useParams();
  const { user, debtStatus, debtIdData } = useSelector(
    (state: RootState) => state.user
  );
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [errMessage, setErrMessage] = useState<string>("")
  const fetchPayment = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://study.logiper.com/financsetErrMessagee/payment-plans/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data}`,
          },
        }
      );

      const data = await res.json();

      setPaymentData(data.data);
     setLoading(false)
    } catch (error) {
      setErrMessage(error)
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);


  const handleChange = async (id: string): Promise<void> => {
    const paymentIndex = paymentData.findIndex((item) => item.id === id);
    if (paymentIndex === -1) return;

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
            Authorization: `Bearer ${user?.data}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      const newPaymentData = [...paymentData];
      newPaymentData[paymentIndex] = updatedPayment;
      setPaymentData(newPaymentData);
      return data
    } catch (err) {
      setErrMessage(err)
    }
  };
  
  if (debtStatus === "loading" && loading) return <Loading />;
if(errMessage) return <Error message="Something Went Wrong"/>
  return (
    <>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Payment" />
      </Helmet>

      <div className="max-w-6xl mx-auto my-10">
        <div className="border-b border-base-300 pb-5">
          <h2 className="text-3xl font-medium tracking-wider capitalize text-slate-500">
            {debtIdData?.data.debtName} Details
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
      
            <PaymentTable paymentData={paymentData} handleChange={handleChange}/>
          </div>
          <div className="lg:col-span-4 lg:pl-4">
            {" "}
            <PaymentPageDetail id={id} />
          </div>
        </div>
      </div>

      <ReturnButton />
    </>
  );
};

export default PaymentPage;

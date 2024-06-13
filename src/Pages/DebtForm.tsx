import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createDebt } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { addMonths, format, isValid, parseISO } from "date-fns";
interface PaymentPlan {
  paymentDate: string;
  paymentAmount: number;
}
interface FormValues {
  debtName: string;
  lenderName: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: PaymentPlan[];
}

const DebtForm: React.FC = () => {
  const { debt, user, debtStatus } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    debtName: "",
    lenderName: "",
    debtAmount: 0,
    interestRate: 0,
    amount: 0,
    paymentStart: "",
    installment: 1,
    description: "",
    paymentPlan: [{ paymentDate: "", paymentAmount: 0 }],
  });

  useEffect(() => {
    const debtAmount = parseFloat(formValues.debtAmount.toString()) || 0;
    const interestRate = parseFloat(formValues.interestRate.toString()) || 0;

    const amount = debtAmount + debtAmount * (interestRate / 100);

    const installment = formValues.installment || 1;
    const paymentAmount = amount / installment;
    const paymentStartDate = parseISO(formValues.paymentStart);
    setFormValues((prevState) => ({
      ...prevState,
      amount,
    }));
    if (isValid(paymentStartDate)) {
      const updatedPaymentPlan = Array.from(
        { length: installment },
        (_, i) => ({
          paymentDate: format(addMonths(paymentStartDate, i), "yyyy-MM-dd"),
          paymentAmount: parseFloat(paymentAmount.toFixed(2)),
        })
      );

      setFormValues((prevState) => ({
        ...prevState,
        paymentPlan: updatedPaymentPlan,
      }));
    }
  }, [
    formValues.debtAmount,
    formValues.interestRate,
    formValues.installment,
    formValues.paymentStart,
  ]);



  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const floatValue =
      !isNaN(parseFloat(value)) &&
      !["paymentDate", "paymentStart"].includes(name)
        ? parseFloat(value)
        : value;
    setFormValues({
      ...formValues,
      [name]: floatValue,
    });
  };



  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(createDebt({ formData: formValues, token: user?.data }));

      navigate("/dashboard?tab=debt");
    
  };


  return (
    <div className="mx-auto max-w-2xl p-2 my-8">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-600">
        Created Debt
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex  justify-center flex-col md:flex-row gap-2  ">
          <div className="relative">
            <input
              type="text"
              id="debtName"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-80 text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Debt Name "
              name="debtName"
              value={formValues.debtName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="debtName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Debt Name
            </label>
          </div>
          <div className="relative ">
            <input
              type="text"
              id="lenderName"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-80  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Lender Name"
              name="lenderName"
              value={formValues.lenderName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="lenderName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Lender Name
            </label>
          </div>
        </div>

        <div className="flex  justify-center flex-col md:flex-row gap-2  ">
          <div className="relative">
            <input
              type="number"
              id="debtAmount"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-80 text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Debt Amount "
              name="debtAmount"
              value={formValues.debtAmount}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="debtAmount"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Debt Amount
            </label>
          </div>
          <div className="relative ">
            <input
              type="number"
              id="interestRate"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-80  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Interest Rate"
              step="0.01"
              name="interestRate"
              value={formValues.interestRate}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="interestRate"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Interest Rate
            </label>
          </div>
        </div>
        <div className="flex  justify-center flex-col md:flex-row gap-3 ">
          <div className="relative">
            <input
              type="number"
              id="amount"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-52 text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="amount "
              name="amount"
              value={formValues.amount}
              onChange={handleChange}
              readOnly
            />
            <label
              htmlFor="amount"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Amount
            </label>
          </div>
          <div className="relative ">
            <input
              type="date"
             
              id="paymentStart"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-52  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Payment Start"
              name="paymentStart"
              value={formValues.paymentStart}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="paymentStart"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Payment Start
            </label>
          </div>

          <div className="relative ">
            <input
              type="number"
              id="installment"
              className="block px-2.5 pb-2.5 pt-4 w-full md:w-52  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Installment"
              name="installment"
              value={formValues.installment}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="installment"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Installment
            </label>
          </div>
        </div>

        <div className="flex     flex-col   ">
          <div className="relative">
            <textarea
              id="description"
              className="flex px-2.5 pt-8  text-sm w-full
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder="Description "
              name="description"
              value={formValues.description}
              onChange={handleChange}
              rows={2}
            ></textarea>
            <label
              htmlFor="description"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Description
            </label>
          </div>
        </div>

        <div className="mt-4">
          <h6 className="text-center font-bold text-slate-500 text-2xl">
            Payments Plan
          </h6>

          {formValues.paymentPlan.map((plan, index) => (
            <div
              className="flex  justify-center flex-col md:flex-row gap-3 my-6"
              key={index}
            >
              <div className="relative ">
                <input
                  type="date"
               
                  id="paymentDate"
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-80 text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder="Payment Date"
                  name="paymentDate"
                  value={plan.paymentDate}
                
                />
                <label
                  htmlFor="paymentDate"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Payment Date
                </label>
              </div>

              <div className="relative ">
                <input
                  type="number"
                  id="paymentAmount"
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-80  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder="Payment Amount"
                  name="paymentAmount"
                  value={plan.paymentAmount}
                  onChange={(e) => handlePaymentPlanChange(index, e)}
                />
                <label
                  htmlFor="paymentAmount"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  PaymentAmount
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md "
          type="submit"
        >
          {debtStatus === "loading" ? "Creating Debt...." : "Create Debt"}
        </button>
      </form>
    </div>
  );
};

export default DebtForm;

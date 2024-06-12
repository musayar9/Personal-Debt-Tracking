import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { formatPercentage, formatPrice } from "../components/Function";
import { addMonths, format, isValid, parseISO } from "date-fns";
import {getDebtId} from "../redux/userSlice"
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

const EditDebt: React.FC = () => {
  const { debt, user, debtIdData } = useSelector(
    (state: RootState) => state.user
  );
  console.log("debt", debt);
  const { id } = useParams();
const dispatch = useDispatch()
  const navigate = useNavigate();
  console.log(id);
  
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    debtName: id ? debtIdData.data.debtName : "",
    lenderName: id ? debtIdData.data.lenderName : "",
    debtAmount: id ? debtIdData.data.debtAmount : "",
    interestRate: id ? debtIdData.data.interestRate : "",
    amount: id ? debtIdData.data.amount : "",
    paymentStart: id ? debtIdData?.data.paymentStart : "",
    installment: id ? debtIdData.data.installment : "",
    description: id ? debtIdData.data.description : "",
    paymentPlan: [{ paymentDate: "", paymentAmount: 0 }],
  });


  useEffect(() => {
    if (id) {
      dispatch(getDebtId({ debtId: id, token: user.data }));
    }

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

  console.log("formValue", formValues);
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
    console.log(formValues);
    try {
      setLoading(true);
      const res = await fetch(`https://study.logiper.com/finance/debt/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.data}`,
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      navigate("/dashboard?tab=debt");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-2xl p-2 my-8">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-600">
        Edit Debt
      </h1>
      <div className="flex justify-end my-3">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            value={show}
            onChange={() => setShow(!show)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-emerald-600" />
          <span className="ms-3 text-sm font-medium text-gray-900 capitalize">
            before value
          </span>
        </label>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex  justify-center flex-col md:flex-row gap-2  ">
          <div className="gap-2">
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

            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {debtIdData?.data?.debtName}
              </p>
            )}
          </div>

          <div>
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
            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {debtIdData?.data?.lenderName}
              </p>
            )}
          </div>
        </div>

        <div className="flex  justify-center flex-col md:flex-row gap-2  ">
          <div className="gap-2">
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

            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {formatPrice(debtIdData?.data?.debtAmount)}
              </p>
            )}
          </div>

          <div>
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
            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {formatPercentage(debtIdData?.data?.interestRate)}
              </p>
            )}
          </div>
        </div>
        <div className="flex  justify-center flex-col md:flex-row gap-3 ">
          <div>
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
                readOnly
              />
              <label
                htmlFor="amount"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Amount
              </label>
            </div>
            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {formatPrice(debtIdData?.data?.amount)}
              </p>
            )}
          </div>
          <div>
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

            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {new Date(debtIdData?.data?.paymentStart).toLocaleDateString()}
              </p>
            )}
          </div>

          <div>
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
            {show && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {debtIdData?.data?.installment}
              </p>
            )}
          </div>
        </div>

        <div className="flex     flex-col   ">
          <div>
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
            {show && debtIdData?.data?.description !== "" && (
              <p className="bg-emerald-500 text-white px-4 py-2 rounded-md my-2 text-xs ">
                {debtIdData?.data?.description}
              </p>
            )}
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
          {loading ? "Editing Debt...." : "Edit Debt"}
        </button>
      </form>
    </div>
  );
};

export default EditDebt;

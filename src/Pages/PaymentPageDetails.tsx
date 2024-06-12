import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { formatPercentage, formatPrice } from "../components/Function";
import { getDebtId } from "../redux/userSlice";

const PaymentPageDetail: React.FC<{id:string}> = ({id}) => {
  const { user, debtIdData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDebtId({ token: user.data, debtId: id }));
  }, [user]);
  const {
    debtName,
    lenderName,
    debtAmount,
    interestRate,
    amount,
    installment,
    description,
    paymentStart,
  } = debtIdData?.data;

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-slate-600 text-center my-12">
        {debtName} Details
      </h2>
      <div className="border border-slate-100 rounded-md shadow-lg">
        <div className="grid grid-cols-3   gap-4 p-4 ml-20 my-6">
          <p className="text-slate-500 text-md font-bold">
            Debt Name :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {debtName}
            </span>
          </p>
          <p className="text-slate-500 text-md font-bold">
            Lender Name :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {lenderName}
            </span>
          </p>

          <p className="text-slate-500 text-md font-bold">
            Payment Start :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {new Date(paymentStart).toLocaleDateString()}
            </span>
          </p>

          <p className="text-slate-500 text-md font-bold">
            Debt Amount:{" "}
            <span className="text-slate-700 text-md font-semibold">
              {formatPrice(debtAmount)}
            </span>
          </p>
          <p className="text-slate-500 text-md font-bold">
            InterestRate :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {formatPercentage(interestRate)}
            </span>
          </p>

          <p className="text-slate-500 text-md font-bold">
            Amount :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {formatPrice(amount)}
            </span>
          </p>
          <p className="text-slate-500 text-md font-bold">
            Installment :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {installment}
            </span>
          </p>
          <p className="text-slate-500 text-md font-bold">
            Description :{" "}
            <span className="text-slate-700 text-md font-semibold">
              {description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageDetail;

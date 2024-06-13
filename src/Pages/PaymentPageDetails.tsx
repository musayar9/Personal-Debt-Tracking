import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { formatPercentage, formatPrice } from "../components/Function";
import { getDebtId } from "../redux/userSlice";

const PaymentPageDetail: React.FC<{id:string}> = ({id}) => {
  const { user, debtIdData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDebtId({ token: user?.data, debtId: id }));
  }, [user]);


  return (
    <div className="">
      <div className="border border-slate-100 rounded-md  m-2 shadow-lg  bg-[#f2f7ff]">
        <div className="grid grid-cols-1  gap-4 p-4  ">
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            <span>Debt Name</span>
            <span className="font-medium">{debtIdData?.data.debtName}</span>
          </p>
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Lender Name :{" "}
            <span className="font-medium">{debtIdData?.data.lenderName}</span>
          </p>

          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Payment Start :{" "}
            <span className="font-medium">
              {new Date(debtIdData?.data.paymentStart).toLocaleDateString()}
            </span>
          </p>

          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Debt Amount:{" "}
            <span className="font-medium">
              {formatPrice(debtIdData?.data.debtAmount)}
            </span>
          </p>
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            InterestRate :{" "}
            <span className="font-medium">
              {formatPercentage(debtIdData?.data.interestRate)}
            </span>
          </p>

          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Amount :{" "}
            <span className="font-medium">
              {formatPrice(debtIdData?.data.amount)}
            </span>
          </p>
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Installment :{" "}
            <span className="font-medium">{debtIdData?.data.installment}</span>
          </p>
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
            Description :{" "}
            <span className="font-medium">
              {debtIdData?.data.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageDetail;

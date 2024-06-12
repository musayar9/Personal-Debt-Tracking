import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchDebt } from "../redux/userSlice";
import { FcDebt } from "react-icons/fc";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { formatPrice } from "./Function";
import ReturnButton from "./ReturnDebt";
const DashboardArea = () => {
  const { user, debtData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDebt({ token: user?.data }));
  }, []);
  console.log("debtData", debtData);
  return (
    <>
      <div className="p-3 md:mx-auto my-8">
        <div className="grid grid-cols-3 gap-4 justify-center">
          <div className="flex flex-col p-3 gap-4 md:w-80 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Debts</h3>
                <p className="text-2xl ">
                  {debtData.data.length > 0 ? debtData.data.length : 0}
                </p>
              </div>
              <FcDebt className="bg-emerald-600 p-3 shadow-lg text-white text-5xl rounded-full" />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
              </span>
              <div className="text-gray-500">İncrement Debt</div>
            </div>
          </div>

          {debtData?.data?.length > 0 && (
            <>
              {debtData?.data?.slice(0, 5).map((item) => (
                <div
                  className="flex flex-col p-3 gap-4 md:w-80 w-full rounded-md shadow-md"
                  key={item.id}
                >
                  <div className="flex justify-between">
                    <div className="">
                      <h3 className="text-gray-500 text-md uppercase">
                        {item.lenderName}
                      </h3>
                      <p className="text-lg ">{item.debtName}</p>
                    </div>
                    <MdPayments className="bg-emerald-600 p-3 shadow-lg text-white text-5xl rounded-full" />
                  </div>
                  <div className="flex  justify-between gap-2 text-sm">
                    <div className="text-gray-500">
                      {formatPrice(item.amount)}
                    </div>
                    <div className="text-gray-500">
                      {new Date(item.paymentStart).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {debtData.data.length > 0 && <ReturnButton />}
    </>
  );
};

export default DashboardArea;

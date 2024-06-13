import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchDebt } from "../redux/userSlice";
import { FcDebt } from "react-icons/fc";
import { HiArrowNarrowUp } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { formatPrice } from "./Function";
import ReturnButton from "./ReturnDebt";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { Helmet } from "react-helmet";
const DashboardArea:React.FC = () => {
  const { user, debtData, debtStatus, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDebt({ token: user?.data }));
  }, []);
  if(debtStatus === "loading")return (
    <div className="max-w-2xl mx-auto">
      <Loading />
    </div>
  );
  
  if(debtStatus ==="failed" || error){
  return <Error message={"Something went wrong!"}/>
  }
  
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {debtData?.data?.length > 0 ? (
          <div className="p-3 md:mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              <div className="flex flex-col p-3 gap-4 md:w-80 w-full rounded-md shadow-md">
                <div className="flex justify-between">
                  <div className="">
                    <h3 className="text-gray-500 text-md uppercase">
                      Total Debts
                    </h3>
                    <p className="text-2xl ">
                      {debtData?.data?.length > 0 ? debtData?.data.length : 0}
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
                      className="flex flex-col p-3 gap-4 md:w-72  lg:w-80 w-full rounded-md shadow-md"
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
            <ReturnButton />
          </div>
        ) : (
          <div className="mx-auto max-w-4xl my-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-semibold text-2xl text-slate-500">
                {" "}
                You have no debt yet
              </p>
              <Link
                to="/dashboard?tab=debt/new_debt"
                className="px-4 py-2 bg-emerald-400 shadow-md capitalize text-white rounded-md"
              >
                new debt
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardArea;

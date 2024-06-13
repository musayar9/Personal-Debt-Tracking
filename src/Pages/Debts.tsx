import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { debtCount } from "../redux/userSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { formatPercentage, formatPrice } from "../components/Function";
import {Debt} from "../types/interfaces"
import { Helmet } from "react-helmet";

const Debts: React.FC = () => {
  const { user} = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [debtData, setDebtData] = useState<Debt[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string>("");
  const fetchDebt = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("https://study.logiper.com/finance/debt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.data}`,
        },
      });

      const data = await res.json();
      dispatch(debtCount(data.data));
      setLoading(false);
      setDebtData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDebt();
  }, []);

  const handleDeletePost = async (): Promise<void> => {
    setShowModal(false);
    try {
  
      const res = await fetch(
        `https://study.logiper.com/finance/debt/${postIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.data}`,
          },
        }
      );
      const data = await res.json();
      setDebtData((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item.id !== postIdToDelete),
      }));

      
      toast.warning(`${data?.data.debtName} Silindi`);

     
      return data;
    } catch (error) {
      console.log(error);
    }
  };
if(loading){
return      <div className="max-w-2xl mx-auto">
          <Loading />
        </div>
}
  return (
    <>
      <Helmet>
        <title>Debts</title>
        <meta name="description" content="Debts" />
      </Helmet>

      {debtData?.data?.length > 0 ? (
        <div className="mx-auto max-w-6xl my-8">
          <div>
            <div className="border-b border-base-300 pb-5">
              <h2 className="text-3xl font-medium tracking-wider capitalize text-slate-500">
                Personal Debt Tracking
              </h2>
            </div>
            <div className=" flex items-center justify-between mt-4 mb-2 p-4">
              <p className="text-lg text-slate-400 font-bold">
                Total Debt :{" "}
                <span className="px-4 py-2 rounded-md text-white bg-emerald-400 text-md">
                  {debtData?.data?.length}
                </span>
              </p>
              <Link
                to="/dashboard?tab=debt/new_debt"
                className="px-4 py-2 bg-emerald-400 shadow-md capitalize text-white rounded-md"
              >
                new debt
              </Link>
            </div>
          </div>

          <div
            className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scroll-bar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
          >
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Debt Name</Table.HeadCell>
                  <Table.HeadCell>Lender Name</Table.HeadCell>
                  <Table.HeadCell>Debt Amount</Table.HeadCell>
                  <Table.HeadCell>İnterest Rate</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Installment</Table.HeadCell>
                  <Table.HeadCell>Payment Start</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>

                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <span>Payment Plan</span>
                  </Table.HeadCell>
                </Table.Head>

                {debtData?.data.map((item) => (
                  <Table.Body key={item.id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700  dark:bg-gray-800">
                      <Table.Cell className="capitalize">
                        {item.debtName}
                      </Table.Cell>

                      <Table.Cell className="capitalize">
                        {item.lenderName}
                      </Table.Cell>

                      <Table.Cell>{formatPrice(item.debtAmount)}</Table.Cell>
                      <Table.Cell>
                        {formatPercentage(item.interestRate)}
                      </Table.Cell>
                      <Table.Cell>{formatPrice(item.amount)}</Table.Cell>
                      <Table.Cell>{item.installment}</Table.Cell>
                      <Table.Cell>
                        {" "}
                        {new Date(item.paymentStart).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        {" "}
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(item.id);
                          }}
                          className="text-red-500 font-medium hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <Link
                          className="text-blue-500 font-medium hover:underline cursor-pointer"
                          to={`/dashboard/edit/${item.id}`}
                        >
                          Edit
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="text-emerald-500 font-medium hover:underline cursor-pointer"
                          to={`/dashboard/payment/${item.id}`}
                        >
                          Pay Debt
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </>

            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />

                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this debt?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeletePost}>
                      Yes, Im sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl my-8">
          <div className="flex flex-col items-center justify-center ">
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
    </>
  );
};

export default Debts;

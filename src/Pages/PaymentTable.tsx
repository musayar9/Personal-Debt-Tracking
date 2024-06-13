import { Table } from "flowbite-react";
import { formatPrice } from "../components/Function";
import { PaymentData } from "../types/interfaces";
interface PaymentTableProps {
  paymentData: PaymentData[];
  handleChange: (id: string) => Promise<void>;
}

const PaymentTable: React.FC<PaymentTableProps > = ({
  handleChange,
  paymentData,
}) => {
  return (
    <>
      <div
        className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  max-w-6xl
    scrollbar-track-slate-100 scroll-bar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      >
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Payment Date</Table.HeadCell>

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
                    placeholder="checkbox"
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
    </>
  );
};

export default PaymentTable;

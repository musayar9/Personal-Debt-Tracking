import {Link} from "react-router-dom"
import { FiArrowLeft} from "react-icons/fi";
const ReturnDebt= () => {
  /*go back to top of list */

  return (
    <Link to="/dashboard?tab=debt"
      className={`border border-emerald-200 px-5 py-2 rounded-xl flex items-center justify-between space-x-3 
        hover:bg-emerald-400 hover:text-emerald-50 duration-700 hover:border-emerald-300  active:translate-y-7`}

      style={{ bottom: "20px", right: "40px", position: "fixed" }}
    >
      <FiArrowLeft/> <span className="font-semibold text-md">Back To Debts</span>
    </Link>
  );
};

export default ReturnDebt;

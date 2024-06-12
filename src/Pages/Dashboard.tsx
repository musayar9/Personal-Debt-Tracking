import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import Debts from "./Debts";
import DebtForm from "./DebtForm";
import EditDebt from "./EditDebt";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*Sidebar */}
        <DashSidebar />
      </div>

      {tab === "debt" && <Debts />}
      {tab === "debt/new_debt" && <DebtForm />}
     
     
    </div>
  );
};
export default Dashboard;

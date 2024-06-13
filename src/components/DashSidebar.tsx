import { Sidebar } from "flowbite-react";
import { RootState } from "../redux/store";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { FcDebt } from "react-icons/fc";


const DashSidebar:React.FC = () => {
  const { user,  } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      {user && user?.status === "success" && (
        <Sidebar className="w-full md:w-56">
          <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
              {
                <Link to="/dashboard?tab=dash">
                  <Sidebar.Item
                    active={tab === "dash" || !tab}
                    icon={MdOutlineSpaceDashboard}
                    as="div"
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>
              }

              <Link to="/dashboard?tab=debt">
                <Sidebar.Item
                  active={tab === "debt"}
                  icon={FcDebt}
                  as="div"
                  labelColor="dark"
                >
                  Debt
                </Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
};

export default DashSidebar;

import { Sidebar } from "flowbite-react";
import { RootState } from "../redux/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { FcDebt } from "react-icons/fc";
import { signOut } from "../redux/userSlice";
import { HiArrowSmRight } from "react-icons/hi";


const DashSidebar:React.FC = () => {
  const { user,  } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState<string>("");
const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
    const handleSignOut = () => {
      dispatch(signOut());

      navigate("/login");
    };
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

              <Sidebar.Item
                icon={HiArrowSmRight}
                as="div"
                className="cursor-pointer"
                onClick={handleSignOut}
                
              >
                Sign-Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
};

export default DashSidebar;

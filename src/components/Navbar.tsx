
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../redux/userSlice";

const Navbar = () => {
  const { user, userStatus } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signOut());

    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900   z-20 top-0 start-0  border-b border-gray-300 dark:border-gray-600 shadow ">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-600 flex gap-2 ">
          P D T
          <span className="text-emerald-500 font-bold hidden md:flex">
            Application
          </span>
        </h2>
        <div className="flex gap-2 font-semibold  text-sm md:text-lg self-center pr-16 ">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "text-teal-600  " : "text-[#334155] ";
            }}
          >
            Home
          </NavLink>
        

          {user && userStatus === "success" && (
            <NavLink
              to="/dashboard?tab=dash"
              className={({ isActive }) => {
                return isActive ? "text-teal-600  " : "text-[#334155] ";
              }}
            >
              Dashboard
            </NavLink>
          )}
        </div>
        <div className=" ">
          <>
            {user && userStatus === "success" ? (
              <button
                onClick={() => handleSignOut()}
                className="bg-emerald-500 text-sm md:text-md px-2 md:px-4 py-1 text-white rounded-sm hover:scale-110 duration-150 ease-linear hover:bg-emerald-600 "
              >
                SignOut
              </button>
            ) : (
              <button className="bg-emerald-500 text-sm md:text-md px-2 md:px-4 py-1 text-white rounded-sm hover:scale-110 duration-150 ease-linear hover:bg-emerald-600 ">
                <Link to="/login">Login</Link>
              </button>
            )}
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

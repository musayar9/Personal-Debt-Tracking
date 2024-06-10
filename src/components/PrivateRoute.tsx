import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

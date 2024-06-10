import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSvg from "../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/userSlice";
import ErrorMessage from "../components/ErrorMessage";
const Login: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const { user, error, userStatus } = useSelector(
    (state: RootState) => state.user
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(login(formData));

    navigate("/dashboard");

    if (user?.status === "error") {
      setErrMessage(user.data);
      return;
    }
  };

  useEffect(() => {
    if (errMessage) {
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
    }
  }, [errMessage]);
  console.log("console.", error);
  console.log("console.", userStatus);
  console.log("user", user);
  return (
    <div className="mx-auto max-w-md p-2 my-8 ">
      <div className="flex items-center justify-center flex-col">
        <img
          src={loginSvg}
          className="shadow-lg drop-shadow-lg h-40 w-40 bg-emerald-400 p-5 rounded-full"
          alt="login"
        />
        <h1 className="text-3xl font-semibold my-8 text-slate-600">Login</h1>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="relative ">
          <input
            type="email"
            id="email"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            E-mail
          </label>
        </div>

        <div className="relative ">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <div className="text-sm  flex items-center pl-2 gap-2">
          <input
            className="border border-slate-500 outline-none text-emerald-600 rounded-sm focus:border-emerald-500"
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            placeholder="password"
          />
          <span className="text-slate-600">Show Password</span>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white p-2 hover:translate-y-1 rounded-md shadow-md"
        >
          {userStatus === "loading" ? "Loading" : "Login"}
        </button>
      </form>

      <div className="flex justify-end my-2">
        <p className="text-xs text-slate-500">
          Do You Have An Account?{" "}
          <Link to="/register" className="text-blue-600 underline pr-2">
            Register
          </Link>
        </p>
      </div>

      {errMessage && <ErrorMessage message={errMessage} />}
    </div>
  );
};

export default Login;

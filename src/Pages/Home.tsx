
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Helmet>

      <div className="max-w-3xl mx-auto my-24">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-2xl font-bold text-slate-700">
            Personal Debt Tracking Application
          </h1>
          <p className="text-xl font-semibold tracking-widest text-slate-500">
            Wherever you are, whether on your tablet, phone, or computer, manage
            your debts with the PDT App! Create your digital wallet, easily
            track your debts, and schedule installments as needed. Plus, at the
            end of each month, review your payment plan with our monthly debt
            tracking feature to ensure timely payments. With PDT, managing your
            debts has never been easier!
          </p>
        </div>

        <div className="flex items-center justify-center my-4">
          <Link
            className="px-4 py-2 bg-slate-500 text-white rounded-md  hover:bg-slate-700"
            to="/dashboard?tab=debt/new_debt"
          >
            Create Debt
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

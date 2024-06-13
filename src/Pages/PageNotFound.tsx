import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const PageNotFound =()=>{
    return (
      <>
        <Helmet>
          <title>Page Not Found</title>
          <meta name="description" content="Home" />
        </Helmet>

        <div>
          <main className="grid min-h-[100vh] place-items-center px-8">
            <div className="text-center">
              <p className="text-9xl font-semibold text-red-600">404</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Page Not Found
              </h1>
              <p className="mt-6 text-lg leading-7 tracking-widest">
                Sorry we could not find the page you are looking for
              </p>
              <div className="mt-10">
                <Link
                  to="/"
                  className=" text-emerald-600 hover:text-emerald-800 capitalize text-lg font-semibold tracking-widest underline flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="" /> Go back Home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
}

export default PageNotFound
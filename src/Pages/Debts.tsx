
import { Link } from 'react-router-dom'

const Debts = () => {
  return (
    <div className="my-5  justify-end">
      <Link
        to="/dashboard?tab=debt/new_debt"
        className="px-4 py-2 bg-emerald-500 text-white rounded-md"
      >
        new debt
      </Link>
    </div>
  );
}

export default Debts
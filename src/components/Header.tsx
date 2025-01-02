import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-50 dark:bg-slate-800 shadow py-4">
      <div className="max-w-7xl pl-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              LIFE METRICS
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export { Header };

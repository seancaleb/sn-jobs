import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 border-b border-slate-200 w-full">
      <div className="container h-full flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600 tracking-[-.5px]">SNJOBS</div>

        {/* Links  */}
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="redux-test">Redux Test</Link>
            </li>
            <li>
              <Link to="react-query-test">React Query Test</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

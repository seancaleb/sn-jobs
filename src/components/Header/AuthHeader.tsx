import { NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.svg";

type AuthHeaderProps = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <>
      <NavLink
        to="/"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
      >
        <img src={logo} className="h-7" />
      </NavLink>

      <div className="text-center space-y-2">
        <div className="text-3xl sm:text-4xl font-bold">{title}</div>
        <p className="sm:text-lg">{description}</p>
      </div>
    </>
  );
};

export default AuthHeader;

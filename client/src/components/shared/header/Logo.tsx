import { Link } from "react-router-dom";
import whiteLogo from "../../../../public/logo-white.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="h-auto text-left sm:h-10">
        <img src={whiteLogo} className="max-h-full w-[100px] object-contain" />
      </div>
    </Link>
  );
};

export default Logo;

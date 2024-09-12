import { Link } from "react-router-dom";
import whiteLogo from "../../../../public/logo-white.png";

const Logo = () => {
  return (
    <Link
      to="/"
    >
<div className="h-10">
        <img
          src={whiteLogo}
          className="max-h-full max-w-full object-contain"
          alt="Flowbite Logo"
        />
</div>
    </Link>
  );
};

export default Logo;

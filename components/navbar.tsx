import { FaRegEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 lg:hidden grey">
      <div>
        <GiHamburgerMenu />
      </div>
      <div>New chat</div>
      <div>
        <FaRegEdit />
      </div>
    </div>
  );
};

export default Navbar;

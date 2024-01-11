"use client";
import { FaRegEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import useChatStore from "@/store/useChat";
const Navbar = () => {
  const { setToggle } = useChatStore();
  const handleClick = () => {
    setToggle();
  };
  return (
    <div className="flex justify-between p-2 lg:hidden grey">
      <button onClick={handleClick}>
        <GiHamburgerMenu />
      </button>
      <div>New chat</div>
      <button>
        <FaRegEdit />
      </button>
    </div>
  );
};

export default Navbar;

"use client";
import { FaRegEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import useChatStore from "@/store/useChat";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const { setToggle, Toggle } = useChatStore();

  const handleClick = () => {
    setToggle(true); // Assuming Toggle is a boolean state
  };
  return (
    <div
      className={twMerge(
        `flex justify-between p-2 lg:hidden
  `,
        Toggle && "hidden"
      )}
    >
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

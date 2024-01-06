import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
const Sidebar = () => {
  return (
    <div className="flex hover rounded-lg m-3 items-center relative">
      <div className="p-1">
        {/* Logo image */}
        <Image
          src="/logo.jpg"
          alt="Description of your image"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div className="p-1 text-white">New chat</div>
      <div className="p-2 absolute top-0 right-0 mt-1 text-white">
        {/* Edit icon */}
        <FaRegEdit />
      </div>
    </div>
  );
};

export default Sidebar;

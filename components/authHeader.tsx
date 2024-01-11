import { TbPointFilled } from "react-icons/tb";
const AuthHeader = () => {
  return (
    <div className="flex py-4 px-8">
      <h1 className="font-bold text-[25px] lg:text-[#D287E4] text-white">
        ChatGPT
      </h1>
      <div>
        <TbPointFilled
          className="lg:auth-text text-white lg:text-[#D287E4] mt-[-8px] ml-[-7px]"
          size={50}
        />
      </div>
    </div>
  );
};

export default AuthHeader;

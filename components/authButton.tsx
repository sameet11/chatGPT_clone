"use client";
import React from "react";
import { useRouter } from "next/navigation";
interface AuthButtonProps {
  text: string;
}
const AuthButton: React.FC<AuthButtonProps> = ({ text }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login/next");
  };
  return (
    <div className="btn-auth-clr rounded-md text-base font-semibold text-center h-11">
      <button className="h-full w-full py-auto" onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};
export default AuthButton;

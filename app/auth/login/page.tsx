import React from "react";
import { TbPointFilled } from "react-icons/tb";
import AuthDynamic from "@/components/authdynamic";
import AuthButton from "@/components/authButton";
import Image from "next/image";
const Login = () => {
  return (
    <div className="bg-black">
      <div className="h-screen flex w-screen">
        <div className="w-3/5 bg-left-auth h-full relative">
          <div className="flex py-4 px-8">
            <h1 className="font-bold text-[25px] auth-text">ChatGPT</h1>
            <div>
              <TbPointFilled
                className="auth-text mt-[-8px] ml-[-7px]"
                size={50}
              />
            </div>
          </div>
          <div className="text-5xl absolute bottom-1/2 left-8">
            <AuthDynamic />
          </div>
        </div>
        <div className="w-2/5 mt-56 relative flex-col text-white">
          <div className="text-3xl font-semibold text-center">
            <h1>Get Started</h1>
          </div>
          <div className="mt-2 flex justify-center">
            <div className="m-2 w-1/3 h-12 rounded-md">
              <AuthButton text="Log in" />
            </div>
            <div className="m-2 w-1/3 h-12 rounded-md">
              <AuthButton text="Sign up" />
            </div>
          </div>
          <div className="absolute bottom-14 w-full text-sm footer">
            <div className="flex flex-col items-center">
              <div className="flex">
                <Image
                  src="/logo-white.png"
                  height={30}
                  width={30}
                  alt="LOGO"
                />
                <h1 className="text-white text-base pt-1 font-bold">OpenAI</h1>
              </div>
              <div className="flex gap-3">
                <a href="" className="text-white underline hover:no-underline">
                  Terms of use
                </a>
                <span>|</span>
                <a href="" className="text-white underline hover:no-underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import AuthDynamic from "@/components/authdynamic";
import AuthButton from "@/components/authButton";
import Image from "next/image";
import AuthHeader from "@/components/authHeader";
const Login = () => {
  return (
    <div className="bg-black">
      <div className="h-screen flex w-screen">
        <div className="w-3/5 bg-left-auth h-full relative hidden lg:block">
          <AuthHeader />
          <div className="text-5xl absolute bottom-1/2 left-8">
            <AuthDynamic />
          </div>
        </div>
        <div className="lg:w-2/5 w-full relative flex-col lg:mt-56 text-white">
          <div className="lg:hidden block mb-56">
            <AuthHeader />
          </div>
          <div className="text-3xl font-semibold text-center">
            <h1>Get Started</h1>
          </div>
          <div className="mt-2 lg:flex-row flex flex-col justify-center">
            <div className="m-2 lg:w-1/3 h-12 rounded-md">
              <AuthButton text="Log in" />
            </div>
            <div className="m-2 lg:w-1/3 h-12 rounded-md">
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

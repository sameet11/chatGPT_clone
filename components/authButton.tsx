import React from "react";

interface AuthButtonProps {
  text: string;
}
const AuthButton: React.FC<AuthButtonProps> = ({ text }) => {
  return (
    <div className="btn-auth-clr rounded-md text-base font-semibold text-center h-11">
      <button className="h-full w-full py-auto">{text}</button>
    </div>
  );
};
export default AuthButton;

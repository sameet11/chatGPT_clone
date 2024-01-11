"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { emailSchema } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/database_types";
import toast from "react-hot-toast";
const EmailSignin = () => {
  const router = useRouter();
  const [email, setemail] = useState<string>("");
  const [check, setcheck] = useState<Boolean>(false);
  const supabase = createClientComponentClient<Database>();
  const handleEmailSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = emailSchema.safeParse(email);
    if (check.success) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      });
      if (error) {
        toast.error("otp was not sent");
        console.log(error);
      } else {
        setcheck(true);
        router.refresh();
        toast.success("magic Link sent");
      }
      setemail("");
    } else {
      toast.error("Enter a valid Email Address");
      setemail("");
      setcheck(false);
    }
  };
  return (
    <form
      onSubmit={handleEmailSignin}
      className="
      w-full
      mt-2
      flex
      flex-col"
    >
      <input
        placeholder="Email address"
        className="h-12 md:w-1/5 w-3/4 rounded-lg mx-auto p-2 border"
        type="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
        value={email}
      />
      <button className="bg-[#10A37F] h-14 mt-4 md:w-1/5 w-3/4 rounded-lg mx-auto text-white">
        Submit
      </button>
      {check && (
        <div className="text-green-600">Magic Link Sent. Check Your Email.</div>
      )}
    </form>
  );
};
export default EmailSignin;

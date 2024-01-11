"use client";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import type { Database } from "@/database_types";
const GoogleSignin = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleGoogleSiginin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    router.refresh();
  };
  return (
    <div className="mt-4 w-full">
      <button
        className="flex mx-auto p-3 border border-gray-400 rounded-lg w-1/5 text-center hover:bg-gray-100 transition ease-in-out"
        onClick={handleGoogleSiginin}
      >
        <Image
          src="/google-icon.png"
          alt="Description of your image"
          width={30}
          height={30}
          className="rounded-full mr-2"
        />
        <h1>Continue with Google</h1>
      </button>
    </div>
  );
};

export default GoogleSignin;

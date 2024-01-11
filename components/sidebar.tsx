"use client";
import { FaRegEdit } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Image from "next/image";
import { conversation } from "@/types";
import type { Database } from "@/database_types";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SidebarItem from "./sidebarItem";

const Sidebar = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [convo, setconvo] = useState<conversation[] | null>(null);
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/auth/login");
        }
      } catch (error) {
        // Handle error checking user session
        console.error("Error checking user session:", error);
      }
    };
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          return;
        }
        const { data: convodata } = await supabase
          .from("conversation")
          .select("*")
          .eq("user_id", user.id);
        setconvo(convodata);
      } catch (error) {
        // Handle error fetching data
        console.error("Error fetching conversations:", error);
      }
    };

    checkUserSession();
    fetchData();
  }, [router, supabase, convo]);
  const handlClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("try again!");
    }
    router.replace("/auth/login");
  };
  return (
    <div className="lg:w-1/6 lg:block lg:shadow-lg hidden bg-black">
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
      <SidebarItem convo={convo} />
      <div className="absolute bottom-0 w-1/6">
        <div
          className="h-10 text-white hover rounded-lg flex items-center m-3 p-2 justify-between bg-gray-800"
          onClick={handlClick}
        >
          <h1>Logout</h1>
          <RiLogoutCircleRLine size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

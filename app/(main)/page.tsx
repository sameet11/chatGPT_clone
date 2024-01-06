import Image from "next/image";
import SuggestedPrompts from "@/components/suggestedprompts";
export default function Home() {
  return (
    <div>
      <div className="font-bold text-xl">ChatGPT</div>
      <div className="mt-[200px]">
        {/* Chatbot profile image */}
        <div>
          <Image
            src="/logo.jpg"
            alt="Description of your image"
            width={70}
            height={70}
            className="rounded-full m-auto"
          />
          <div className="p-1 text-center font-bold text-lg">
            How can I help you today?
          </div>
        </div>
        <SuggestedPrompts />
      </div>
    </div>
  );
}

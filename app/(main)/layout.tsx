import Disclaimer from "@/components/disclaimer";
import Navbar from "@/components/navbar";
import Prompt from "@/components/prompt";
import Sidebar from "@/components/sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main h-screen flex flex-col">
      {/* Main content */}
      <div className=" h-screen flex">
        {/* Sidebar section */}
        <div className="lg:w-1/6 lg:block lg:shadow-lg hidden bg-black">
          <Sidebar />
        </div>
        {/* Main chat section */}
        <div className="lg:w-5/6 w-screen text-white main-chat">
          {/*navbar for phone screen*/}
          <Navbar />
          {/*main section*/}
          <div className="w-full h-full px-4 py-2 flex flex-col">
            {children}
            {/* input*/}
            <div>
              <div className=" h-1/6 bottom-0 w-full">
                <div className="lg:w-2/3 mt-4 mx-auto">
                  <Prompt />
                </div>
                <div className="m-2">
                  <Disclaimer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

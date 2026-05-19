import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

export default function MainLayout({
  children,
}) {

  return (

    <div className="flex min-h-screen bg-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          <div className="max-w-[1600px] mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}
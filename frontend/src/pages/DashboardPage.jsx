import Hero from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardView from "../components/DashboardView";
import { getUserName } from "../utils/getUserName";

export default function DashboardPage() {
  const email = localStorage.getItem("userEmail");

  const userData = {
    name: getUserName(email),
    email: email,
    totalBookings: 5,
    memberSince: "2026",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#081120] via-[#0b1729] to-black">

      <Hero />

      <main className="flex-1 pt-28">
        <DashboardView userData={userData} />
      </main>

      <div className="bg-gradient-to-b from-[#081120] via-[#0b1729] to-black border-t border-gray-800">
        <Footer />
      </div>

    </div>
  );
}
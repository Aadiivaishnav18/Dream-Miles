import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TravelLanding from "./components/TravelLanding";
import TravelPackages from "./components/TravelPackages";
import FeaturedAccommodations from "./components/FeaturedAccommodations";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import SignOut from "./pages/SignOut";
import DashboardPage from "./pages/DashboardPage";
import Destinations from "./pages/Destinations";
import Package from "./pages/Package";
import Booking from "./pages/Booking";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/signin" />;
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TravelLanding />
      <TravelPackages />
      <FeaturedAccommodations />
      <MapSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signin" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/signout" element={<SignOut />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/destinations"
        element={
          <ProtectedRoute>
            <Destinations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/packages"
        element={
          <ProtectedRoute>
            <Package />
          </ProtectedRoute>
        }
      />

      {/* Booking Route */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signin" />} />

    </Routes>
  );
}

export default App;
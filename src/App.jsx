import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/Hero";
import TravelLanding from "./components/TravelLanding";
import TravelPackages from "./components/TravelPackages";
import FeaturedAccommodations from "./components/FeaturedAccommodations";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import SignOut from "./pages/SignOut";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/signin" />;
}

function Home() {
  return (
    <>
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

      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
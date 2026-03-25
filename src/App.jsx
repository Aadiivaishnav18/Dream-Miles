import { Routes, Route, Navigate } from "react-router-dom";

import Hero from './components/Hero';
import TravelLanding from './components/TravelLanding';
import TravelPackages from "./components/TravelPackages";
import FeaturedAccommodations from './components/FeaturedAccommodations';
import MapSection from "./components/MapSection";
import Footer from './components/Footer';

import Login from './pages/Login';

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

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
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
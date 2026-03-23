import React from 'react'
import Hero from './components/Hero';
import TravelLanding from './components/TravelLanding';
import TravelPackages from "./components/TravelPackages";
import FeaturedAccommodations from './components/FeaturedAccommodations';
import MapSection from "./components/MapSection";
import Footer from './components/Footer';



function App() {
  return (
    <div className="min-h-screen bg-background">
      {/*connection*/}
      <Hero />
      <TravelLanding/>
  <TravelPackages />
<FeaturedAccommodations/>
      <MapSection />
      <Footer/>

    </div>
  )
}

export default App
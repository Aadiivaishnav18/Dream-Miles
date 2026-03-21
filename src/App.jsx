import React from 'react'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* The Hero component you just created */}
      <Hero />

      {/* Placeholder for the next section to test scrolling */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
          <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Explore our hand-picked selection of the most breathtaking locations across the globe.
          </p>
        </div>

        {/* Temporary Grid to visualize space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-80 rounded-3xl bg-muted animate-pulse flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Destination Card {item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
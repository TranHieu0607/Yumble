import React from 'react'

const HomePage = () => {
  // Data array cho venues
  const venues = [
    {
      id: 1,
      name: "Club 360 @ Setia Ecohill",
      location: "Semenyih, Selangor",
      image: "path_to_image_1",
      sports: ["BASKETBALL", "FUTSAL", "BADMINTON"]
    },
    // ... other venue data
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://www.courtsite.my/images/cover_mobile.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">
            Get Active, Book Your Games Now
          </h1>
          <p className="text-lg text-white text-center max-w-3xl mb-8">
            From favorites like badminton and futsal to trendy pickleball and frisbee, play all kinds of sports nationwide!
          </p>

          {/* Search Container */}
          <div className="w-full max-w-4xl bg-white rounded-lg p-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4">
            {/* Sport Select */}
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </select>


            <input 
              type="text" 
              placeholder="Search venue name, city, or state"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Date Input */}
            <input 
              type="date" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Search Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md flex items-center justify-center gap-2 transition duration-150">
              <span>Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Venue Cards Section */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-40">
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {venue.sports.map((sport, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base mb-1">{venue.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{venue.location}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 flex items-center justify-center gap-1.5 hover:bg-gray-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
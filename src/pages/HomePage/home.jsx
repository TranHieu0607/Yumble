import React from 'react'

const HomePage = () => {
  // Data array cho venues
  const venues = [
    {
      id: 1,
      name: "Club 360 @ Setia Ecohill",
      location: "Semenyih, Selangor",
      image: "https://motgame.vn/stores/news_dataimages/2024/112024/03/14/faker-720241103142046.jpg?rt=20241103142513",
      sports: ["BASKETBALL", "FUTSAL", "BADMINTON"]
    },
    {
      id: 2,
      name: "Club 360 @ Setia Ecohill",
      location: "Semenyih, Selangor",
      image: "https://tvovermind.com/wp-content/uploads/2018/12/travisscott-hero.jpg",
      sports: ["BASKETBALL", "FUTSAL", "BADMINTON"]
    },
    {
      id: 3,
      name: "Club 360 @ Setia Ecohill",
      location: "Semenyih, Selangor",
      image: "https://i.insider.com/635af9b7ea35650019e08e23?width=1200&format=jpeg",
      sports: ["BASKETBALL", "FUTSAL", "BADMINTON"]
    },
    {
      id: 4,
      name: "Club 360 @ Setia Ecohill",
      location: "Semenyih, Selangor",
      image: "https://cdnimages01.azureedge.net/renascenca/doc2019060926427014jc_3265176864c8.jpg",
      sports: ["BASKETBALL", "FUTSAL", "BADMINTON"]
    },
    // ... other venue data
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px]">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
            Get Active, Book Your Games Now
          </h1>
          <p className="text-lg lg:text-xl text-white text-center max-w-3xl mb-8">
            From favorites like badminton and futsal to trendy pickleball and frisbee, play all kinds of sports nationwide!
          </p>

          {/* Simplified Search Bar */}
          <div className="w-full max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search for venues, sports, or locations..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Venue Cards Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
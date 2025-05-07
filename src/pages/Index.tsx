
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import Globe from '@/components/Globe';
import { domainOfLawOptions, indianStates, majorCities, lawyers } from '@/data/mockData';
import { IndianCity, Lawyer } from '@/types';
import LawyerCard from '@/components/LawyerCard';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<IndianCity | null>(null);
  const [cityLawyers, setCityLawyers] = useState<Lawyer[]>([]);
  
  const popularLawyers = lawyers
    .sort((a, b) => b.review.rating - a.review.rating)
    .slice(0, 4);
  
  const handleCitySelect = (city: IndianCity) => {
    setSelectedCity(city);
    // Filter lawyers by the selected city
    const filteredLawyers = lawyers
      .filter(lawyer => lawyer.city === city.name)
      .sort((a, b) => b.review.rating - a.review.rating)
      .slice(0, 4);
    setCityLawyers(filteredLawyers);
  };

  const handleSearch = (query: { keyword: string; location: string; domain: string }) => {
    // This would navigate to the lawyers page with search params
    window.location.href = `/lawyers?keyword=${encodeURIComponent(query.keyword)}&location=${encodeURIComponent(query.location)}&domain=${encodeURIComponent(query.domain)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-legal-primary to-legal-accent text-white py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find the Perfect Legal Expert for Your Case
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                Connect with over 5,000 experienced lawyers across India specializing in various domains of law.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <SearchBar 
                  onSearch={handleSearch} 
                  locations={indianStates} 
                  domains={domainOfLawOptions}
                />
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <span className="text-sm text-gray-200">Popular searches:</span>
                {domainOfLawOptions.slice(0, 5).map(domain => (
                  <Link key={domain} to={`/lawyers?domain=${encodeURIComponent(domain)}`}>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 cursor-pointer">
                      {domain}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-legal-primary/30"></div>
        </section>

        {/* Interactive Globe Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">
                Explore Lawyers Across India
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Navigate our interactive 3D globe to discover top legal professionals in every city across India. Click on any city to view available lawyers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Globe cities={majorCities} onCitySelect={handleCitySelect} />
              </div>
              <div className="lg:col-span-1">
                {selectedCity ? (
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="text-2xl font-bold text-legal-primary mb-2">{selectedCity.name}</h3>
                    <p className="text-gray-500">{selectedCity.state}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="bg-legal-light text-legal-primary px-3 py-1 rounded-full text-sm font-medium">
                        {selectedCity.lawyerCount} Registered Lawyers
                      </div>
                    </div>
                    {cityLawyers.length > 0 ? (
                      <div className="mt-6 space-y-4">
                        <h4 className="text-lg font-semibold">Top Lawyers in {selectedCity.name}</h4>
                        {cityLawyers.map((lawyer) => (
                          <Link 
                            key={lawyer.id} 
                            to={`/lawyers/${lawyer.id}`}
                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                              <img 
                                src={lawyer.imageUrl} 
                                alt={`${lawyer.firstName} ${lawyer.lastName}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h5 className="font-medium">{lawyer.firstName} {lawyer.lastName}</h5>
                              <p className="text-sm text-gray-500">
                                {lawyer.domainOfLaw[0]}{lawyer.domainOfLaw.length > 1 ? ' & more' : ''}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-4 text-center">
                          <Link to={`/lawyers?city=${encodeURIComponent(selectedCity.name)}`}>
                            <Button variant="outline" className="text-legal-primary border-legal-primary hover:bg-legal-primary hover:text-white">
                              View All {selectedCity.name} Lawyers
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 text-center py-8">
                        <p className="text-gray-500">Click on a city in the globe to see lawyers from that area</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center items-center">
                    <div className="w-16 h-16 rounded-full bg-legal-light flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-legal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-legal-primary mb-2">Interactive City Selection</h3>
                    <p className="text-gray-500 text-center mb-6">
                      Click on any city in the 3D globe to view the top lawyers available in that location.
                    </p>
                    <p className="text-sm text-gray-400 italic">
                      Tip: Drag to rotate, scroll to zoom
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Lawyers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">
                Top Rated Lawyers
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover some of the highest-rated legal professionals across various domains of law.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/lawyers">
                <Button className="bg-legal-primary hover:bg-legal-primary/90">
                  View All Lawyers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">
                Legal Practice Areas
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore various domains of law and find specialists in each field.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {domainOfLawOptions.map(domain => (
                <Link
                  key={domain}
                  to={`/lawyers?domain=${encodeURIComponent(domain)}`}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform duration-200"
                >
                  <div className="h-14 w-14 rounded-full bg-legal-light mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-legal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-legal-primary">{domain}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-legal-primary mb-4">
                Why Choose Bharat Legal Globe
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're committed to connecting you with the best legal representation across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-legal-light mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-legal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Verified Professionals</h3>
                <p className="text-gray-600">
                  All lawyers on our platform are verified members of recognized Bar Associations with proven track records.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-legal-light mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-legal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Transparent Reviews</h3>
                <p className="text-gray-600">
                  Authentic client reviews and ratings to help you make informed decisions about your legal representation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 rounded-full bg-legal-light mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-legal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Nationwide Coverage</h3>
                <p className="text-gray-600">
                  Access to legal experts across all states and major cities in India, ensuring you find local expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-legal-primary to-legal-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Legal Expert?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of clients who have found the right legal representation through Bharat Legal Globe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/lawyers">
                <Button className="bg-white text-legal-primary hover:bg-gray-100">
                  Find a Lawyer
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="text-white border-white hover:bg-white/20">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

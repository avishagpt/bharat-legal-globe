
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import LawyerCard from '@/components/LawyerCard';
import LawyerFilters from '@/components/LawyerFilters';
import { Button } from '@/components/ui/button';
import { filterOptions as defaultFilterOptions, lawyers, domainOfLawOptions, indianStates } from '@/data/mockData';
import { Lawyer } from '@/types';

const LawyersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    domain: searchParams.get('domain') || '',
  });
  
  // Initialize filters from URL params
  useEffect(() => {
    const initFilters: Record<string, any> = {};
    
    if (searchParams.get('city')) {
      initFilters.city = searchParams.get('city') || 'all_cities';
    }
    
    if (searchParams.get('state')) {
      initFilters.state = searchParams.get('state') || 'all_states';
    }
    
    if (searchParams.get('domain')) {
      initFilters.domains = [searchParams.get('domain') || ''];
    }
    
    if (searchParams.get('minFees')) {
      initFilters.minFees = parseInt(searchParams.get('minFees') || '0');
    }
    
    if (searchParams.get('maxFees')) {
      initFilters.maxFees = parseInt(searchParams.get('maxFees') || '100000');
    }
    
    if (searchParams.get('minRating')) {
      initFilters.minRating = parseFloat(searchParams.get('minRating') || '0');
    }
    
    setActiveFilters(initFilters);
  }, [searchParams]);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...lawyers];
    
    // Apply keyword search
    if (searchQuery.keyword) {
      const keyword = searchQuery.keyword.toLowerCase();
      results = results.filter(lawyer => 
        lawyer.firstName.toLowerCase().includes(keyword) ||
        lawyer.lastName.toLowerCase().includes(keyword) ||
        lawyer.domainOfLaw.some(domain => domain.toLowerCase().includes(keyword))
      );
    }
    
    // Apply location search
    if (searchQuery.location && searchQuery.location !== 'all_locations') {
      results = results.filter(lawyer => 
        lawyer.city.toLowerCase() === searchQuery.location.toLowerCase() ||
        lawyer.state.toLowerCase() === searchQuery.location.toLowerCase()
      );
    }
    
    // Apply domain search
    if (searchQuery.domain && searchQuery.domain !== 'all_practice_areas') {
      results = results.filter(lawyer => 
        lawyer.domainOfLaw.some(domain => 
          domain.toLowerCase() === searchQuery.domain.toLowerCase()
        )
      );
    }
    
    // Apply active filters
    if (activeFilters.city && activeFilters.city !== 'all_cities') {
      results = results.filter(lawyer => lawyer.city === activeFilters.city);
    }
    
    if (activeFilters.state && activeFilters.state !== 'all_states') {
      results = results.filter(lawyer => lawyer.state === activeFilters.state);
    }
    
    if (activeFilters.domains && activeFilters.domains.length > 0) {
      results = results.filter(lawyer => 
        lawyer.domainOfLaw.some(domain => 
          activeFilters.domains.includes(domain)
        )
      );
    }
    
    if (activeFilters.genders && activeFilters.genders.length > 0) {
      results = results.filter(lawyer => 
        activeFilters.genders.includes(lawyer.gender)
      );
    }
    
    if (activeFilters.minRating !== undefined && activeFilters.maxRating !== undefined) {
      results = results.filter(lawyer => 
        lawyer.review.rating >= activeFilters.minRating &&
        lawyer.review.rating <= activeFilters.maxRating
      );
    }
    
    if (activeFilters.minFees !== undefined && activeFilters.maxFees !== undefined) {
      results = results.filter(lawyer => 
        lawyer.feesPerHearing >= activeFilters.minFees &&
        lawyer.feesPerHearing <= activeFilters.maxFees
      );
    }
    
    if (activeFilters.barAssociations && activeFilters.barAssociations.length > 0) {
      results = results.filter(lawyer => 
        activeFilters.barAssociations.includes(lawyer.barAssociation)
      );
    }
    
    // Sort by rating (highest first)
    results = results.sort((a, b) => b.review.rating - a.review.rating);
    
    setFilteredLawyers(results);
  }, [searchQuery, activeFilters]);
  
  const handleSearch = (query: { keyword: string; location: string; domain: string }) => {
    setSearchQuery(query);
    
    // Update URL params
    const newParams = new URLSearchParams();
    if (query.keyword) newParams.set('keyword', query.keyword);
    if (query.location) newParams.set('location', query.location);
    if (query.domain) newParams.set('domain', query.domain);
    
    setSearchParams(newParams);
  };
  
  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    
    if (filters.city) {
      newParams.set('city', filters.city);
    } else {
      newParams.delete('city');
    }
    
    if (filters.state) {
      newParams.set('state', filters.state);
    } else {
      newParams.delete('state');
    }
    
    if (filters.minFees !== undefined && filters.maxFees !== undefined) {
      newParams.set('minFees', filters.minFees.toString());
      newParams.set('maxFees', filters.maxFees.toString());
    }
    
    setSearchParams(newParams);
  };
  
  const handleClearFilters = () => {
    setActiveFilters({});
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 bg-gray-50">
        {/* Search Section */}
        <section className="bg-gradient-to-r from-legal-primary to-legal-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Find a Lawyer</h1>
            <div className="bg-white p-4 rounded-lg shadow">
              <SearchBar 
                onSearch={handleSearch}
                locations={indianStates}
                domains={domainOfLawOptions}
              />
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-legal-primary">
                {filteredLawyers.length} Lawyers Found
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className={`w-full md:w-1/4 ${!showFilters ? 'hidden md:block' : ''}`}>
                <LawyerFilters 
                  filterOptions={defaultFilterOptions}
                  onFilterChange={handleFilterChange}
                  activeFilters={activeFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
              
              {/* Results Grid */}
              <div className="w-full md:w-3/4">
                {filteredLawyers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLawyers.map(lawyer => (
                      <LawyerCard key={lawyer.id} lawyer={lawyer} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">No lawyers found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search criteria or filters to see more results.
                    </p>
                    <Button onClick={handleClearFilters}>Clear All Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LawyersPage;

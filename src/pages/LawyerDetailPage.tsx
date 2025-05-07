
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Mail, MapPin, Award, Briefcase } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { lawyers } from '@/data/mockData';
import { Lawyer } from '@/types';
import LawyerCard from '@/components/LawyerCard';

const LawyerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [similarLawyers, setSimilarLawyers] = useState<Lawyer[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    // Find the lawyer by ID
    const foundLawyer = lawyers.find(l => l.id === id) || null;
    setLawyer(foundLawyer);
    
    // Find similar lawyers (same domain, state, etc.)
    if (foundLawyer) {
      const similar = lawyers
        .filter(l => 
          l.id !== id && 
          (
            l.domainOfLaw.some(domain => foundLawyer.domainOfLaw.includes(domain)) ||
            l.state === foundLawyer.state
          )
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setSimilarLawyers(similar);
    }
  }, [id]);
  
  if (!lawyer) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-legal-primary mb-4">Lawyer Not Found</h2>
            <p className="text-gray-600 mb-6">The lawyer you're looking for doesn't exist or has been removed.</p>
            <Link to="/lawyers">
              <Button className="bg-legal-primary hover:bg-legal-primary/90">
                Browse All Lawyers
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-legal-secondary text-legal-secondary" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-5 w-5 fill-legal-secondary text-legal-secondary" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 bg-gray-50">
        <div className="bg-legal-primary text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="h-40 w-40 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={lawyer.imageUrl}
                    alt={`${lawyer.firstName} ${lawyer.lastName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {lawyer.firstName} {lawyer.lastName}
                </h1>
                
                <p className="text-xl mb-4">
                  {lawyer.domainOfLaw.join(", ")} Specialist
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {lawyer.domainOfLaw.map((domain) => (
                    <Badge key={domain} variant="secondary" className="bg-white/20">
                      {domain}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <div className="flex">
                    {renderStarRating(lawyer.review.rating)}
                  </div>
                  <span className="ml-2">({lawyer.review.rating.toFixed(1)} - {lawyer.review.count} reviews)</span>
                </div>
                
                <p className="flex items-center justify-center md:justify-start">
                  <MapPin className="h-4 w-4 mr-1" />
                  {lawyer.city}, {lawyer.state}
                </p>
              </div>
              
              <div className="md:ml-auto">
                <div className="flex flex-col gap-3">
                  <Button className="bg-white text-legal-primary hover:bg-white/90">
                    <Phone className="h-4 w-4 mr-2" /> Contact
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    <Mail className="h-4 w-4 mr-2" /> Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">About {lawyer.firstName}</h2>
                  <p className="text-gray-700 mb-6">
                    {lawyer.about}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lawyer.languages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">Practice Areas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lawyer.domainOfLaw.map((domain) => (
                      <div key={domain} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-legal-accent mr-2"></div>
                        <span>{domain}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-legal-secondary" />
                      <h3 className="text-xl font-semibold">Case Statistics</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-500 mb-1">Total Cases</p>
                          <p className="text-3xl font-bold text-legal-primary">{lawyer.totalCases}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-500 mb-1">Wins</p>
                          <p className="text-3xl font-bold text-green-600">{lawyer.totalWins}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-500 mb-1">Losses</p>
                          <p className="text-3xl font-bold text-red-500">{lawyer.totalLosses}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-5 w-5 text-legal-secondary" />
                      <h3 className="text-xl font-semibold">Work Experience</h3>
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <div className="border-l-2 border-legal-accent pl-4 pb-4">
                        <h4 className="font-semibold">Senior Advocate</h4>
                        <p className="text-gray-500 text-sm mb-1">Private Practice • {lawyer.city}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date().getFullYear() - lawyer.yearsOfExperience + 5} - Present
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-legal-accent pl-4">
                        <h4 className="font-semibold">Junior Advocate</h4>
                        <p className="text-gray-500 text-sm mb-1">
                          {lawyer.barAssociation} • {lawyer.state}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date().getFullYear() - lawyer.yearsOfExperience} - {new Date().getFullYear() - lawyer.yearsOfExperience + 5}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="education" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Education</h2>
                  
                  <div className="space-y-6">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-legal-accent pl-4 pb-4">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-gray-500 text-sm mb-1">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">Graduated: {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Client Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStarRating(lawyer.review.rating)}
                      </div>
                      <span className="text-lg">
                        {lawyer.review.rating.toFixed(1)} ({lawyer.review.count} reviews)
                      </span>
                    </div>
                  </div>
                  
                  {/* Mock reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-semibold">Rajiv Mehta</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-legal-secondary text-legal-secondary" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Excellent advocate! {lawyer.firstName} handled my property dispute case with utmost professionalism. Very knowledgeable and responsive.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-semibold">Anita Sharma</p>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-legal-secondary text-legal-secondary" />
                            ))}
                            {[...Array(1)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Very helpful in navigating my complex divorce case. Good communication though sometimes took a while to respond.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-semibold">Vikram Patel</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-legal-secondary text-legal-secondary" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Brilliant legal mind! {lawyer.firstName} won our business litigation case even when things seemed impossible. Worth every rupee.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:col-span-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-legal-primary mr-3" />
                      <span>{lawyer.contactNumber}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-legal-primary mr-3" />
                      <span>{lawyer.email}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-legal-primary mr-3 mt-0.5" />
                      <span>{lawyer.city}, {lawyer.state}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-legal-primary hover:bg-legal-primary/90 mt-6">
                    Schedule a Consultation
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Professional Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Years of Experience</span>
                      <span className="font-medium">{lawyer.yearsOfExperience} years</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bar Association</span>
                      <span className="font-medium">{lawyer.barAssociation}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fees per Hearing</span>
                      <span className="font-medium">₹{lawyer.feesPerHearing.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Success Rate</span>
                      <span className="font-medium">
                        {Math.round((lawyer.totalWins / lawyer.totalCases) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Similar Lawyers */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Lawyers</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LawyerDetailPage;

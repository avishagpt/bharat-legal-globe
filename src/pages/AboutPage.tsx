
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Award, Globe, MapPin, Scale, Landmark } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-legal-primary to-legal-accent text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Legal Bharat</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connecting clients with qualified legal professionals across India since 2022
            </p>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-legal-primary mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  At Legal Bharat, our mission is to democratize access to quality legal services across India. 
                  We believe that everyone deserves access to reliable legal representation regardless of their 
                  location or background.
                </p>
                <p className="text-lg text-gray-700">
                  Through our innovative platform, we connect clients with experienced lawyers who specialize in 
                  various domains of law, ensuring that individuals and businesses can find the right legal counsel 
                  for their specific needs.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-legal-primary/10 rounded-lg transform rotate-6"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Legal professionals in discussion" 
                    className="relative rounded-lg shadow-lg w-full max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-legal-primary mb-12">Our Impact in Numbers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-legal-primary mb-2">5,000+</div>
                  <p className="text-gray-500">Registered Lawyers</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-legal-primary mb-2">28</div>
                  <p className="text-gray-500">States Covered</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-legal-primary mb-2">15+</div>
                  <p className="text-gray-500">Practice Areas</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-legal-primary mb-2">50,000+</div>
                  <p className="text-gray-500">Clients Served</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-legal-primary mb-6">What Makes Us Different</h2>
            <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Legal Bharat was built with the vision to transform how legal services are accessed in India. 
              Here's what sets us apart:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-legal-light flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Verified Professionals</h3>
                <p className="text-gray-600">
                  Every lawyer on Legal Bharat undergoes thorough verification, including bar association membership 
                  and credential checks, ensuring you connect with genuine legal professionals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-legal-light flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Nationwide Coverage</h3>
                <p className="text-gray-600">
                  Our platform covers all states and major cities across India, allowing you to find local legal 
                  expertise no matter where you are located.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-legal-light flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-2">Specialized Expertise</h3>
                <p className="text-gray-600">
                  Find lawyers in specific domains of law who have demonstrated expertise in their field, 
                  with transparent success rates and client reviews.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-legal-primary mb-12">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Rajesh Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-1">Rajesh Sharma</h3>
                <p className="text-gray-500 mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Former Supreme Court advocate with over 20 years of experience in constitutional law.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Priya Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-1">Priya Patel</h3>
                <p className="text-gray-500 mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Tech leader with expertise in building scalable platforms, previously at LegalTech startups.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/62.jpg"
                    alt="Vikram Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-legal-primary mb-1">Vikram Singh</h3>
                <p className="text-gray-500 mb-3">Head of Legal Relations</p>
                <p className="text-gray-600 text-sm">
                  Corporate attorney with a network across major law firms and bar associations in India.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-legal-primary mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-legal-primary mb-2">How do I find a lawyer on Legal Bharat?</h3>
                <p className="text-gray-700">
                  You can search for lawyers by location, practice area, or specific keywords. Our advanced filters allow you 
                  to narrow down your search based on experience, fees, ratings, and more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-legal-primary mb-2">Are all lawyers on the platform verified?</h3>
                <p className="text-gray-700">
                  Yes, we verify the credentials of all lawyers on our platform, including their bar association memberships 
                  and professional backgrounds.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-legal-primary mb-2">How are lawyer ratings determined?</h3>
                <p className="text-gray-700">
                  Ratings are based on genuine client reviews and feedback after legal services have been provided. Our 
                  verification system ensures authentic reviews from actual clients.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-legal-primary mb-2">What if I'm not satisfied with a lawyer?</h3>
                <p className="text-gray-700">
                  We have a customer support team ready to address any concerns. While we cannot guarantee outcomes of legal 
                  matters, we strive to ensure the highest professional standards from all lawyers on our platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-legal-primary to-legal-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
              <div className="flex-1 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p>42 Legal Plaza, Richmond Town</p>
                <p>Bengaluru, Karnataka 560025</p>
              </div>
              
              <div className="flex-1 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <div className="h-6 w-6 flex items-center justify-center">@</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p>contact@legalbharat.in</p>
                <p>support@legalbharat.in</p>
              </div>
              
              <div className="flex-1 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <div className="h-6 w-6 flex items-center justify-center">☏</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p>+91 80 2223 4455</p>
                <p>+91 99887 66554</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

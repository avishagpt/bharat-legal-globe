
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-legal-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bharat Legal Globe</h3>
            <p className="mb-4 text-gray-300">
              Connecting clients with the best legal professionals across India.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white hover:text-legal-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-legal-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-legal-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-legal-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-legal-secondary">Home</Link></li>
              <li><Link to="/lawyers" className="text-gray-300 hover:text-legal-secondary">Find Lawyers</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-legal-secondary">Pricing</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-legal-secondary">About Us</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-legal-secondary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-legal-secondary">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              <li><Link to="/lawyers?domain=Criminal+Law" className="text-gray-300 hover:text-legal-secondary">Criminal Law</Link></li>
              <li><Link to="/lawyers?domain=Family+Law" className="text-gray-300 hover:text-legal-secondary">Family Law</Link></li>
              <li><Link to="/lawyers?domain=Corporate+Law" className="text-gray-300 hover:text-legal-secondary">Corporate Law</Link></li>
              <li><Link to="/lawyers?domain=Intellectual+Property" className="text-gray-300 hover:text-legal-secondary">Intellectual Property</Link></li>
              <li><Link to="/lawyers?domain=Real+Estate+Law" className="text-gray-300 hover:text-legal-secondary">Real Estate Law</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <div className="flex items-center mb-3">
                <MapPin className="mr-2 h-5 w-5 text-legal-secondary" />
                <span className="text-gray-300">123 Legal Avenue, New Delhi, India - 110001</span>
              </div>
              <div className="flex items-center mb-3">
                <Phone className="mr-2 h-5 w-5 text-legal-secondary" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-legal-secondary">+91 12345 67890</a>
              </div>
              <div className="flex items-center mb-3">
                <Mail className="mr-2 h-5 w-5 text-legal-secondary" />
                <a href="mailto:info@bharatlegalglobe.in" className="text-gray-300 hover:text-legal-secondary">info@bharatlegalglobe.in</a>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Bharat Legal Globe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

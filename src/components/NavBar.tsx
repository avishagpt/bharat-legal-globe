
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-legal-primary to-legal-accent flex items-center justify-center">
                <span className="text-white font-bold">LB</span>
              </div>
              <span className="ml-2 text-xl font-serif font-bold text-legal-primary">Legal Bharat</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-legal-primary nav-link">Home</Link>
            <Link to="/lawyers" className="font-medium text-gray-700 hover:text-legal-primary nav-link">Find Lawyers</Link>
            <Link to="/pricing" className="font-medium text-gray-700 hover:text-legal-primary nav-link">Pricing</Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-legal-primary nav-link">About</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-legal-primary text-white hover:bg-legal-primary/90">
                Register
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legal-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lawyers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legal-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Lawyers
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legal-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-legal-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 flex flex-col space-y-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-legal-primary text-legal-primary">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-legal-primary text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;

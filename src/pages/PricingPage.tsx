
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { pricingPlans } from '@/data/mockData';

const PricingPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-legal-primary to-legal-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl mb-8">
                Choose the plan that fits your needs. Access India's top legal professionals.
              </p>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-lg p-1 inline-flex shadow-sm">
                <button
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    billing === 'monthly'
                      ? 'bg-legal-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setBilling('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    billing === 'yearly'
                      ? 'bg-legal-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setBilling('yearly')}
                >
                  Yearly <span className="text-xs">(Save 20%)</span>
                </button>
              </div>
            </div>
            
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? 'ring-2 ring-legal-secondary' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4 bg-legal-secondary">Most Popular</Badge>
                  )}
                  
                  <div className="p-6 text-center border-b">
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-gray-500 mb-4">For {plan.id === 'basic' ? 'individual' : plan.id === 'premium' ? 'professional' : 'enterprise'} needs</p>
                    <div className="flex justify-center items-baseline">
                      <span className="text-4xl font-bold">₹{(billing === 'yearly' ? plan.price * 10 : plan.price).toLocaleString()}</span>
                      <span className="ml-2 text-gray-500">/{billing === 'yearly' ? 'year' : 'month'}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Link to="/register">
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-legal-secondary hover:bg-legal-secondary/90 text-white' 
                              : 'bg-legal-primary hover:bg-legal-primary/90'
                          }`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">What is included in the Basic plan?</h3>
                  <p className="text-gray-700">
                    The Basic plan includes access to all lawyer profiles, basic search and filter functionality, and limited email support. You can save up to 5 lawyer profiles for future reference.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">How do I cancel my subscription?</h3>
                  <p className="text-gray-700">
                    You can cancel your subscription at any time from your account settings. If you cancel, your plan will remain active until the end of the current billing period.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">Can I switch plans at any time?</h3>
                  <p className="text-gray-700">
                    Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change is immediate and you will be charged the prorated difference. If you downgrade, the change will take effect at the end of your current billing cycle.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">Are there any hidden fees?</h3>
                  <p className="text-gray-700">
                    No, the price you see is the price you pay. There are no setup fees or hidden charges. All taxes applicable in India are included in the displayed prices.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
                  <p className="text-gray-700">
                    We accept all major credit and debit cards, UPI payments, net banking, and popular digital wallets in India like PayTM and Google Pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-legal-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of clients who have found the perfect legal representation through Bharat Legal Globe.
            </p>
            <Link to="/register">
              <Button className="bg-white text-legal-primary hover:bg-gray-100 text-lg px-8 py-6">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;

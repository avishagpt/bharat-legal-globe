
import { FilterOptions, IndianCity, Lawyer, PricingPlan } from "@/types";

export const domainOfLawOptions = [
  "Criminal Law",
  "Civil Law",
  "Corporate Law",
  "Family Law",
  "Intellectual Property",
  "Labor Law",
  "Tax Law",
  "Constitutional Law",
  "Environmental Law",
  "Real Estate Law"
];

export const experienceRanges = [
  "0-5 years",
  "5-10 years",
  "10-15 years",
  "15-20 years",
  "20+ years"
];

export const feeRanges = [
  "₹1,000 - ₹5,000",
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹20,000",
  "₹20,000 - ₹50,000",
  "₹50,000+"
];

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export const barAssociations = [
  "Bar Council of India",
  "Delhi Bar Council",
  "Maharashtra Bar Council",
  "Karnataka Bar Council",
  "Tamil Nadu Bar Council",
  "Uttar Pradesh Bar Council",
  "West Bengal Bar Council",
  "Punjab Bar Council",
  "Gujarat Bar Council",
  "Rajasthan Bar Council"
];

export const majorCities: IndianCity[] = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    coordinates: [72.8777, 19.0760],
    population: 12442373,
    lawyerCount: 542
  },
  {
    name: "Delhi",
    state: "Delhi",
    coordinates: [77.1025, 28.7041],
    population: 11034555,
    lawyerCount: 678
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    coordinates: [77.5946, 12.9716],
    population: 8425970,
    lawyerCount: 423
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    coordinates: [78.4867, 17.3850],
    population: 6809970,
    lawyerCount: 321
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    coordinates: [80.2707, 13.0827],
    population: 4646732,
    lawyerCount: 289
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    coordinates: [88.3639, 22.5726],
    population: 4496694,
    lawyerCount: 345
  },
  {
    name: "Pune",
    state: "Maharashtra",
    coordinates: [73.8567, 18.5204],
    population: 3124458,
    lawyerCount: 214
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    coordinates: [72.5714, 23.0225],
    population: 5570585,
    lawyerCount: 267
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    coordinates: [75.7873, 26.9124],
    population: 3046163,
    lawyerCount: 187
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    coordinates: [80.9462, 26.8467],
    population: 2815601,
    lawyerCount: 156
  },
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    coordinates: [77.4126, 23.2599],
    population: 1798218,
    lawyerCount: 112
  },
  {
    name: "Patna",
    state: "Bihar",
    coordinates: [85.1376, 25.5941],
    population: 1684222,
    lawyerCount: 98
  },
  {
    name: "Kochi",
    state: "Kerala",
    coordinates: [76.2673, 9.9312],
    population: 602046,
    lawyerCount: 87
  },
  {
    name: "Chandigarh",
    state: "Punjab",
    coordinates: [76.7794, 30.7333],
    population: 1055450,
    lawyerCount: 76
  },
  {
    name: "Guwahati",
    state: "Assam",
    coordinates: [91.7362, 26.1445],
    population: 957352,
    lawyerCount: 65
  }
];

// Generate random lawyers data
const generateRandomLawyers = (count: number): Lawyer[] => {
  const firstNames = [
    "Rajesh", "Ananya", "Vikram", "Priya", "Amit", "Neha", "Sanjay", "Divya", 
    "Arjun", "Meera", "Rahul", "Pooja", "Karan", "Nisha", "Vivek", "Kavita", 
    "Deepak", "Shalini", "Aditya", "Anjali", "Siddharth", "Geeta", "Varun", "Ritu",
    "Ashok", "Lakshmi", "Nitin", "Jaya", "Rakesh", "Sunita"
  ];

  const lastNames = [
    "Sharma", "Patel", "Singh", "Verma", "Agarwal", "Iyer", "Joshi", "Chopra", 
    "Reddy", "Malhotra", "Gupta", "Nair", "Mehta", "Bose", "Kumar", "Shah", 
    "Chatterjee", "Kapoor", "Pillai", "Banerjee", "Rao", "Desai", "Patil", "Mahajan",
    "Mittal", "Bajaj", "Saxena", "Khanna", "Menon", "Bhatia"
  ];

  const lawyers: Lawyer[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * (65 - 28)) + 28;
    const gender = ["Male", "Female", "Other"][Math.floor(Math.random() * 2)] as "Male" | "Female" | "Other";
    
    const cityIndex = Math.floor(Math.random() * majorCities.length);
    const city = majorCities[cityIndex].name;
    const state = majorCities[cityIndex].state;
    
    const domains = [];
    const domainCount = Math.floor(Math.random() * 3) + 1;
    const shuffledDomains = [...domainOfLawOptions].sort(() => 0.5 - Math.random());
    for (let j = 0; j < domainCount; j++) {
      domains.push(shuffledDomains[j]);
    }
    
    const totalCases = Math.floor(Math.random() * 200) + 10;
    const winRate = Math.random() * 0.4 + 0.5; // Win rate between 50% and 90%
    const totalWins = Math.floor(totalCases * winRate);
    const totalLosses = totalCases - totalWins;
    
    const feesPerHearing = (Math.floor(Math.random() * 10) + 1) * 5000;
    const rating = Math.random() * 2 + 3; // Rating between 3 and 5
    const reviewCount = Math.floor(Math.random() * 100) + 5;

    const barAssociation = barAssociations[Math.floor(Math.random() * barAssociations.length)];
    const yearsOfExperience = Math.floor(Math.random() * 30) + 1;

    const languages = ["Hindi", "English"];
    if (Math.random() > 0.5) {
      languages.push("Gujarati", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Punjabi")[Math.floor(Math.random() * 8)];
    }

    const education = [
      {
        degree: "LLB",
        institution: ["National Law School", "ILS Law College", "Faculty of Law, Delhi University", 
                     "Symbiosis Law School", "Government Law College Mumbai"][Math.floor(Math.random() * 5)],
        year: 2023 - yearsOfExperience
      }
    ];
    
    if (Math.random() > 0.6) {
      education.push({
        degree: "LLM",
        institution: ["National Law School", "ILS Law College", "Faculty of Law, Delhi University", 
                     "Symbiosis Law School", "Government Law College Mumbai"][Math.floor(Math.random() * 5)],
        year: 2023 - yearsOfExperience + 3
      });
    }

    lawyers.push({
      id: `lawyer-${i + 1}`,
      firstName,
      lastName,
      age,
      gender,
      state,
      city,
      contactNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@legalemail.in`,
      domainOfLaw: domains,
      totalCases,
      totalWins,
      totalLosses,
      feesPerHearing,
      review: {
        rating,
        count: reviewCount
      },
      barAssociation,
      imageUrl: `/placeholder.svg`,
      about: `${firstName} ${lastName} is a dedicated legal professional with over ${yearsOfExperience} years of experience specializing in ${domains.join(", ")}. Known for a strategic approach to cases and strong client advocacy.`,
      yearsOfExperience,
      languages,
      education
    });
  }

  return lawyers;
};

export const lawyers = generateRandomLawyers(100);

export const filterOptions: FilterOptions = {
  states: indianStates,
  cities: majorCities.map(city => city.name),
  domainOfLaw: domainOfLawOptions,
  genders: ["Male", "Female", "Other"],
  experienceRanges,
  feeRanges,
  ratings: [1, 2, 3, 4, 5],
  barAssociations
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 999,
    features: [
      "Access to lawyer profiles",
      "Basic search functionality",
      "Email support",
      "Save up to 5 lawyers"
    ],
    popular: false,
    billing: "monthly"
  },
  {
    id: "premium",
    name: "Premium",
    price: 4999,
    features: [
      "All Basic features",
      "Direct contact with lawyers",
      "Priority support",
      "Detailed case history",
      "Save unlimited lawyers",
      "Document review (2 per month)"
    ],
    popular: true,
    billing: "monthly"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9999,
    features: [
      "All Premium features",
      "Dedicated relationship manager",
      "24/7 phone support",
      "Customized legal reports",
      "Case strategy sessions",
      "Document review (unlimited)"
    ],
    popular: false,
    billing: "monthly"
  }
];

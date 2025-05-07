
export interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  state: string;
  city: string;
  contactNumber: string;
  email: string;
  domainOfLaw: string[];
  totalCases: number;
  totalWins: number;
  totalLosses: number;
  feesPerHearing: number;
  review: {
    rating: number;
    count: number;
  };
  barAssociation: string;
  imageUrl: string;
  about: string;
  yearsOfExperience: number;
  languages: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: "client" | "lawyer";
}

export interface IndianCity {
  name: string;
  state: string;
  coordinates: [number, number]; // [longitude, latitude]
  population: number;
  lawyerCount: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
  billing: "monthly" | "yearly";
}

export interface FilterOptions {
  states: string[];
  cities: string[];
  domainOfLaw: string[];
  genders: ("Male" | "Female" | "Other")[];
  experienceRanges: string[];
  feeRanges: string[];
  ratings: number[];
  barAssociations: string[];
}

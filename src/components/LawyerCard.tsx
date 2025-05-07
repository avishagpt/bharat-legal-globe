
import { Lawyer } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  const {
    id,
    firstName,
    lastName,
    city,
    state,
    domainOfLaw,
    yearsOfExperience,
    feesPerHearing,
    review,
    imageUrl
  } = lawyer;

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-legal-secondary text-legal-secondary" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-legal-secondary text-legal-secondary" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Link to={`/lawyers/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 bg-gradient-to-r from-legal-primary to-legal-accent">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <CardContent className="pt-16 pb-4">
          <h3 className="text-xl font-bold text-center">{firstName} {lastName}</h3>
          <p className="text-gray-500 text-center mb-4">{city}, {state}</p>
          
          <div className="flex justify-center mb-3">
            <div className="flex items-center">
              {renderStarRating(review.rating)}
              <span className="ml-1 text-sm text-gray-500">({review.count})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {domainOfLaw.slice(0, 2).map((domain) => (
              <Badge key={domain} variant="secondary" className="bg-legal-light text-legal-primary">
                {domain}
              </Badge>
            ))}
            {domainOfLaw.length > 2 && (
              <Badge variant="secondary" className="bg-legal-light text-legal-primary">
                +{domainOfLaw.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded-md">
              <p className="text-gray-500">Experience</p>
              <p className="font-semibold">{yearsOfExperience} years</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-md">
              <p className="text-gray-500">Fees</p>
              <p className="font-semibold">₹{feesPerHearing.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LawyerCard;

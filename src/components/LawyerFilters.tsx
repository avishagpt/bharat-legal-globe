
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/types";
import { X } from "lucide-react";

interface LawyerFiltersProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: Record<string, any>) => void;
  activeFilters: Record<string, any>;
  onClearFilters: () => void;
}

const LawyerFilters: React.FC<LawyerFiltersProps> = ({
  filterOptions,
  onFilterChange,
  activeFilters,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>(activeFilters);
  const [ratingRange, setRatingRange] = useState<number[]>([
    activeFilters.minRating || 0,
    activeFilters.maxRating || 5,
  ]);
  const [feesRange, setFeesRange] = useState<number[]>([
    activeFilters.minFees || 0,
    activeFilters.maxFees || 100000,
  ]);

  const handleCheckboxChange = (category: string, value: string) => {
    const currentValues = localFilters[category] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];

    setLocalFilters({
      ...localFilters,
      [category]: updatedValues,
    });
  };

  const handleSelectChange = (category: string, value: string) => {
    setLocalFilters({
      ...localFilters,
      [category]: value,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      ...localFilters,
      minRating: ratingRange[0],
      maxRating: ratingRange[1],
      minFees: feesRange[0],
      maxFees: feesRange[1],
    });
  };

  const handleRatingChange = (values: number[]) => {
    setRatingRange(values);
  };

  const handleFeesChange = (values: number[]) => {
    setFeesRange(values);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Filters</h3>
        {Object.keys(activeFilters).length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["location", "practice-area", "experience"]}>
        <AccordionItem value="location">
          <AccordionTrigger className="font-medium">Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="state-select">State</Label>
                <Select
                  value={localFilters.state || ""}
                  onValueChange={(value) => handleSelectChange("state", value)}
                >
                  <SelectTrigger id="state-select">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {filterOptions.states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city-select">City</Label>
                <Select
                  value={localFilters.city || ""}
                  onValueChange={(value) => handleSelectChange("city", value)}
                >
                  <SelectTrigger id="city-select">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cities</SelectItem>
                    {filterOptions.cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="practice-area">
          <AccordionTrigger className="font-medium">Practice Area</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {filterOptions.domainOfLaw.map((domain) => (
                <div key={domain} className="flex items-center space-x-2">
                  <Checkbox
                    id={`domain-${domain}`}
                    checked={(localFilters.domains || []).includes(domain)}
                    onCheckedChange={() => handleCheckboxChange("domains", domain)}
                  />
                  <Label htmlFor={`domain-${domain}`} className="cursor-pointer">
                    {domain}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="font-medium">Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.experienceRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${range}`}
                    checked={(localFilters.experienceRanges || []).includes(range)}
                    onCheckedChange={() => handleCheckboxChange("experienceRanges", range)}
                  />
                  <Label htmlFor={`exp-${range}`} className="cursor-pointer">
                    {range}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fees">
          <AccordionTrigger className="font-medium">Fees</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Fee Range (₹)</Label>
                <Slider
                  defaultValue={[feesRange[0], feesRange[1]]}
                  max={100000}
                  step={1000}
                  value={[feesRange[0], feesRange[1]]}
                  onValueChange={handleFeesChange}
                  className="my-4"
                />
                <div className="flex items-center justify-between">
                  <span>₹{feesRange[0].toLocaleString()}</span>
                  <span>₹{feesRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="font-medium">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Rating Range</Label>
                <Slider
                  defaultValue={[ratingRange[0], ratingRange[1]]}
                  max={5}
                  step={0.5}
                  value={[ratingRange[0], ratingRange[1]]}
                  onValueChange={handleRatingChange}
                  className="my-4"
                />
                <div className="flex items-center justify-between">
                  <span>{ratingRange[0].toFixed(1)} ★</span>
                  <span>{ratingRange[1].toFixed(1)} ★</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger className="font-medium">Gender</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.genders.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={(localFilters.genders || []).includes(gender)}
                    onCheckedChange={() => handleCheckboxChange("genders", gender)}
                  />
                  <Label htmlFor={`gender-${gender}`} className="cursor-pointer">
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bar">
          <AccordionTrigger className="font-medium">Bar Association</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {filterOptions.barAssociations.map((bar) => (
                <div key={bar} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bar-${bar}`}
                    checked={(localFilters.barAssociations || []).includes(bar)}
                    onCheckedChange={() => handleCheckboxChange("barAssociations", bar)}
                  />
                  <Label htmlFor={`bar-${bar}`} className="cursor-pointer text-sm">
                    {bar}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        onClick={handleApplyFilters}
        className="w-full mt-6 bg-legal-primary hover:bg-legal-primary/90"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default LawyerFilters;

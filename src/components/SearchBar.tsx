
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: { keyword: string; location: string; domain: string }) => void;
  locations: string[];
  domains: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, locations, domains }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [domain, setDomain] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, location, domain });
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search by name, keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-12 border-gray-300 focus:border-legal-primary"
        />
      </div>
      
      <div className="md:w-64">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-legal-primary">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:w-64">
        <Select value={domain} onValueChange={setDomain}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-legal-primary">
            <SelectValue placeholder="Select practice area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Practice Areas</SelectItem>
            {domains.map((dom) => (
              <SelectItem key={dom} value={dom}>{dom}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="submit" 
        className="h-12 bg-legal-primary hover:bg-legal-primary/90 text-white px-6"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, MapPin, Globe, Filter, X } from "lucide-react";
import WorldMap from "@/components/WorldMap";

interface Destination {
  id: string;
  name: string;
  coordinates: [number, number];
  country: string;
  image: string;
  description: string;
  avgBudget: string;
  category: string;
}

const allDestinations: Destination[] = [
  // India
  { id: "1", name: "Jaipur", coordinates: [75.7873, 26.9124], country: "India", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800", description: "The Pink City with majestic palaces", avgBudget: "₹15,000", category: "culture" },
  { id: "2", name: "Kerala Backwaters", coordinates: [76.2711, 9.9312], country: "India", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800", description: "Serene houseboats & lush greenery", avgBudget: "₹20,000", category: "nature" },
  { id: "3", name: "Varanasi", coordinates: [82.9913, 25.3176], country: "India", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800", description: "Spiritual heart of India", avgBudget: "₹12,000", category: "spiritual" },
  { id: "4", name: "Ladakh", coordinates: [77.5771, 34.1526], country: "India", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800", description: "Breathtaking mountain landscapes", avgBudget: "₹25,000", category: "adventure" },
  { id: "5", name: "Goa", coordinates: [74.1240, 15.2993], country: "India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", description: "Beaches, parties & Portuguese charm", avgBudget: "₹18,000", category: "beach" },
  
  // Europe
  { id: "6", name: "Paris", coordinates: [2.3522, 48.8566], country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", description: "The City of Love & Lights", avgBudget: "$2,500", category: "culture" },
  { id: "7", name: "Barcelona", coordinates: [2.1734, 41.3851], country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800", description: "Art, architecture & beaches", avgBudget: "$2,200", category: "culture" },
  { id: "8", name: "Santorini", coordinates: [25.4615, 36.3932], country: "Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800", description: "Iconic white & blue paradise", avgBudget: "$2,800", category: "beach" },
  { id: "9", name: "Swiss Alps", coordinates: [8.2275, 46.8182], country: "Switzerland", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", description: "Majestic peaks & scenic villages", avgBudget: "$3,500", category: "adventure" },
  { id: "10", name: "Rome", coordinates: [12.4964, 41.9028], country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", description: "Ancient history & delicious food", avgBudget: "$2,000", category: "culture" },
  
  // Asia
  { id: "11", name: "Tokyo", coordinates: [139.6917, 35.6895], country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", description: "Where tradition meets future", avgBudget: "$3,000", category: "culture" },
  { id: "12", name: "Bali", coordinates: [115.1889, -8.4095], country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", description: "Tropical paradise & spirituality", avgBudget: "$1,500", category: "beach" },
  { id: "13", name: "Maldives", coordinates: [73.2207, 3.2028], country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", description: "Paradise island getaway", avgBudget: "$4,000", category: "beach" },
  { id: "14", name: "Bangkok", coordinates: [100.5018, 13.7563], country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800", description: "Temples, street food & nightlife", avgBudget: "$1,200", category: "culture" },
  { id: "15", name: "Singapore", coordinates: [103.8198, 1.3521], country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800", description: "Modern city-state marvel", avgBudget: "$2,500", category: "culture" },
  
  // Americas
  { id: "16", name: "New York", coordinates: [-74.0060, 40.7128], country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", description: "The city that never sleeps", avgBudget: "$3,200", category: "culture" },
  { id: "17", name: "Machu Picchu", coordinates: [-72.5450, -13.1631], country: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800", description: "Ancient Incan wonder", avgBudget: "$2,000", category: "adventure" },
  { id: "18", name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068], country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800", description: "Carnival & stunning beaches", avgBudget: "$1,800", category: "beach" },
  { id: "19", name: "Grand Canyon", coordinates: [-112.1401, 36.0544], country: "USA", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800", description: "Nature's magnificent wonder", avgBudget: "$1,500", category: "nature" },
  
  // Middle East & Africa
  { id: "20", name: "Dubai", coordinates: [55.2708, 25.2048], country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", description: "Luxury & modern marvels", avgBudget: "$2,800", category: "culture" },
  { id: "21", name: "Cape Town", coordinates: [18.4241, -33.9249], country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800", description: "Mountains meet the ocean", avgBudget: "$1,600", category: "nature" },
  { id: "22", name: "Marrakech", coordinates: [-7.9811, 31.6295], country: "Morocco", image: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=800", description: "Vibrant souks & rich culture", avgBudget: "$1,200", category: "culture" },
  
  // Oceania
  { id: "23", name: "Sydney", coordinates: [151.2093, -33.8688], country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800", description: "Iconic Opera House & beaches", avgBudget: "$2,500", category: "culture" },
  { id: "24", name: "Queenstown", coordinates: [168.6626, -45.0312], country: "New Zealand", image: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800", description: "Adventure capital of the world", avgBudget: "$2,800", category: "adventure" },
];

const categories = [
  { id: "all", label: "All", icon: Globe },
  { id: "culture", label: "Culture", icon: Globe },
  { id: "beach", label: "Beach", icon: Globe },
  { id: "adventure", label: "Adventure", icon: Globe },
  { id: "nature", label: "Nature", icon: Globe },
  { id: "spiritual", label: "Spiritual", icon: Globe },
];

const ExploreDestinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  const filteredDestinations = allDestinations.filter((dest) => {
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDestinationClick = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handlePlanTrip = () => {
    if (selectedDestination) {
      navigate("/plan", { state: { destination: selectedDestination.name } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-semibold text-primary">Explore World</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Mapbox Token Input */}
        {showTokenInput && (
          <div className="mb-6 p-4 bg-card rounded-2xl border border-border shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Enter Mapbox Token</h3>
              {mapboxToken && (
                <Button variant="ghost" size="sm" onClick={() => setShowTokenInput(false)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Get your free token at{" "}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1 h-10 px-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button onClick={() => setShowTokenInput(false)} disabled={!mapboxToken}>
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search destinations worldwide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map & Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
            <WorldMap
              destinations={filteredDestinations}
              onDestinationClick={handleDestinationClick}
              mapboxToken={mapboxToken}
            />
          </div>

          {/* Destinations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold text-foreground">
                {filteredDestinations.length} Destinations
              </h2>
              {!showTokenInput && mapboxToken && (
                <Button variant="ghost" size="sm" onClick={() => setShowTokenInput(true)}>
                  Change Token
                </Button>
              )}
            </div>

            {/* Selected Destination Card */}
            {selectedDestination && (
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 animate-scale-in">
                <div className="flex gap-4">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {selectedDestination.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedDestination.country}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedDestination.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-medium">{selectedDestination.avgBudget}</span>
                      <Button size="sm" onClick={handlePlanTrip}>
                        Plan Trip
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable List */}
            <div className="max-h-[450px] overflow-y-auto space-y-3 pr-2">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleDestinationClick(dest)}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedDestination?.id === dest.id
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-card border border-border hover:border-primary/20"
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-foreground truncate">{dest.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{dest.country}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{dest.description}</p>
                    <span className="text-xs text-primary font-medium">{dest.avgBudget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExploreDestinations;

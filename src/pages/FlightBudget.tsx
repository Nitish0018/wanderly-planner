import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane, Search, TrendingUp, TrendingDown, Minus, Calendar, MapPin } from "lucide-react";

interface FlightDestination {
  id: string;
  name: string;
  country: string;
  image: string;
  economyPrice: number;
  businessPrice: number;
  currency: string;
  flightDuration: string;
  bestMonth: string;
  priceChange: "up" | "down" | "stable";
  changePercent: number;
}

const flightDestinations: FlightDestination[] = [
  // India
  { id: "1", name: "Jaipur", country: "India", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800", economyPrice: 3500, businessPrice: 12000, currency: "₹", flightDuration: "2h 15m", bestMonth: "October - March", priceChange: "stable", changePercent: 0 },
  { id: "2", name: "Kerala", country: "India", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800", economyPrice: 4200, businessPrice: 15000, currency: "₹", flightDuration: "2h 45m", bestMonth: "September - March", priceChange: "down", changePercent: 8 },
  { id: "3", name: "Goa", country: "India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", economyPrice: 3800, businessPrice: 13000, currency: "₹", flightDuration: "2h 10m", bestMonth: "November - February", priceChange: "up", changePercent: 12 },
  { id: "4", name: "Ladakh", country: "India", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800", economyPrice: 8500, businessPrice: 25000, currency: "₹", flightDuration: "1h 30m", bestMonth: "June - September", priceChange: "up", changePercent: 15 },
  
  // Europe
  { id: "5", name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", economyPrice: 650, businessPrice: 2800, currency: "$", flightDuration: "9h 30m", bestMonth: "April - June", priceChange: "down", changePercent: 5 },
  { id: "6", name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800", economyPrice: 580, businessPrice: 2400, currency: "$", flightDuration: "10h 15m", bestMonth: "May - September", priceChange: "stable", changePercent: 0 },
  { id: "7", name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800", economyPrice: 720, businessPrice: 3200, currency: "$", flightDuration: "11h 45m", bestMonth: "April - October", priceChange: "up", changePercent: 10 },
  { id: "8", name: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", economyPrice: 620, businessPrice: 2600, currency: "$", flightDuration: "10h 00m", bestMonth: "April - June", priceChange: "down", changePercent: 7 },
  
  // Asia
  { id: "9", name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", economyPrice: 850, businessPrice: 4500, currency: "$", flightDuration: "7h 30m", bestMonth: "March - May", priceChange: "stable", changePercent: 0 },
  { id: "10", name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", economyPrice: 480, businessPrice: 2200, currency: "$", flightDuration: "8h 45m", bestMonth: "April - October", priceChange: "down", changePercent: 12 },
  { id: "11", name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", economyPrice: 550, businessPrice: 2800, currency: "$", flightDuration: "4h 30m", bestMonth: "November - April", priceChange: "up", changePercent: 18 },
  { id: "12", name: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800", economyPrice: 380, businessPrice: 1800, currency: "$", flightDuration: "4h 15m", bestMonth: "November - February", priceChange: "down", changePercent: 6 },
  { id: "13", name: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800", economyPrice: 420, businessPrice: 2100, currency: "$", flightDuration: "5h 30m", bestMonth: "February - April", priceChange: "stable", changePercent: 0 },
  
  // Americas
  { id: "14", name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", economyPrice: 950, businessPrice: 5200, currency: "$", flightDuration: "15h 30m", bestMonth: "April - June", priceChange: "up", changePercent: 8 },
  { id: "15", name: "Rio de Janeiro", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800", economyPrice: 780, businessPrice: 3800, currency: "$", flightDuration: "18h 00m", bestMonth: "December - March", priceChange: "down", changePercent: 10 },
  
  // Middle East
  { id: "16", name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", economyPrice: 450, businessPrice: 2400, currency: "$", flightDuration: "3h 45m", bestMonth: "November - March", priceChange: "stable", changePercent: 0 },
  
  // Oceania
  { id: "17", name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800", economyPrice: 980, businessPrice: 5500, currency: "$", flightDuration: "12h 30m", bestMonth: "September - November", priceChange: "up", changePercent: 5 },
  { id: "18", name: "Queenstown", country: "New Zealand", image: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800", economyPrice: 1100, businessPrice: 6200, currency: "$", flightDuration: "14h 00m", bestMonth: "December - February", priceChange: "down", changePercent: 8 },
];

const FlightBudget = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<"economy" | "business">("economy");
  const [sortBy, setSortBy] = useState<"price" | "duration" | "name">("price");

  const filteredDestinations = flightDestinations
    .filter((dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") {
        return selectedClass === "economy" 
          ? a.economyPrice - b.economyPrice 
          : a.businessPrice - b.businessPrice;
      }
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.flightDuration.localeCompare(b.flightDuration);
    });

  const getPriceChangeIcon = (change: FlightDestination["priceChange"]) => {
    switch (change) {
      case "up": return <TrendingUp className="w-4 h-4 text-destructive" />;
      case "down": return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriceChangeClass = (change: FlightDestination["priceChange"]) => {
    switch (change) {
      case "up": return "text-destructive";
      case "down": return "text-green-500";
      default: return "text-muted-foreground";
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
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-semibold text-primary">Flight Budget</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Class Toggle */}
            <div className="flex gap-2 bg-muted rounded-xl p-1">
              <button
                onClick={() => setSelectedClass("economy")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedClass === "economy"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Economy
              </button>
              <button
                onClick={() => setSelectedClass("business")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedClass === "business"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Business
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "price", label: "Price" },
                { id: "duration", label: "Duration" },
                { id: "name", label: "Name" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id as typeof sortBy)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    sortBy === option.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  Sort: {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
            <p className="text-xs text-muted-foreground mb-1">Cheapest Flight</p>
            <p className="text-2xl font-display font-bold text-primary">
              {selectedClass === "economy" ? "$380" : "$1,800"}
            </p>
            <p className="text-xs text-muted-foreground">Bangkok, Thailand</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
            <p className="text-xs text-muted-foreground mb-1">Best Deal</p>
            <p className="text-2xl font-display font-bold text-green-500">-18%</p>
            <p className="text-xs text-muted-foreground">Maldives</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
            <p className="text-xs text-muted-foreground mb-1">Destinations</p>
            <p className="text-2xl font-display font-bold text-foreground">{flightDestinations.length}</p>
            <p className="text-xs text-muted-foreground">Worldwide</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
            <p className="text-xs text-muted-foreground mb-1">Avg. Price</p>
            <p className="text-2xl font-display font-bold text-foreground">
              {selectedClass === "economy" ? "$620" : "$3,100"}
            </p>
            <p className="text-xs text-muted-foreground">Round trip</p>
          </div>
        </div>

        {/* Flight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden hover:shadow-card transition-shadow cursor-pointer"
              onClick={() => navigate("/plan", { state: { destination: dest.name } })}
            >
              {/* Image */}
              <div className="relative h-32">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-lg">
                  {getPriceChangeIcon(dest.priceChange)}
                  <span className={`text-xs font-medium ${getPriceChangeClass(dest.priceChange)}`}>
                    {dest.priceChange === "stable" ? "Stable" : `${dest.changePercent}%`}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {dest.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      {dest.currency}{selectedClass === "economy" ? dest.economyPrice.toLocaleString() : dest.businessPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">round trip</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{dest.flightDuration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{dest.bestMonth}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No destinations found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FlightBudget;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Compass, MapPin, Calendar, DollarSign, Search, Bell, User, Plane } from "lucide-react";
import { TripCard } from "@/types/trip";
import LoginDialog from "@/components/LoginDialog";
const sampleTrips: TripCard[] = [
  {
    id: "1",
    destination: "Kyoto, Japan",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    dates: "Mar 15-22, 2024",
    budget: 2500,
    status: "planned"
  },
  {
    id: "2",
    destination: "Barcelona, Spain",
    coverImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
    dates: "Apr 5-12, 2024",
    budget: 1800,
    status: "planned"
  },
  {
    id: "3",
    destination: "Santorini, Greece",
    coverImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    dates: "May 1-7, 2024",
    budget: 2200,
    status: "planned"
  },
  {
    id: "4",
    destination: "Bali, Indonesia",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    dates: "Jun 10-20, 2024",
    budget: 1500,
    status: "planned"
  }
];

const indianDestinations = [
  {
    id: "ind-1",
    name: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    description: "The Pink City with majestic palaces",
    avgBudget: "₹15,000"
  },
  {
    id: "ind-2",
    name: "Kerala Backwaters",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    description: "Serene houseboats & lush greenery",
    avgBudget: "₹20,000"
  },
  {
    id: "ind-3",
    name: "Varanasi, UP",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    description: "Spiritual heart of India",
    avgBudget: "₹12,000"
  },
  {
    id: "ind-4",
    name: "Ladakh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    description: "Breathtaking mountain landscapes",
    avgBudget: "₹25,000"
  },
  {
    id: "ind-5",
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    description: "Beaches, parties & Portuguese charm",
    avgBudget: "₹18,000"
  },
  {
    id: "ind-6",
    name: "Udaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800",
    description: "City of Lakes & romance",
    avgBudget: "₹16,000"
  }
];

const foreignDestinations = [
  {
    id: "for-1",
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description: "The City of Love & Lights",
    avgBudget: "$2,500"
  },
  {
    id: "for-2",
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    description: "Where tradition meets future",
    avgBudget: "$3,000"
  },
  {
    id: "for-3",
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    description: "Paradise island getaway",
    avgBudget: "$4,000"
  },
  {
    id: "for-4",
    name: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
    description: "Majestic peaks & scenic villages",
    avgBudget: "$3,500"
  },
  {
    id: "for-5",
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    description: "Luxury & modern marvels",
    avgBudget: "$2,800"
  },
  {
    id: "for-6",
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    description: "The city that never sleeps",
    avgBudget: "$3,200"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [trips] = useState<TripCard[]>(sampleTrips);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-semibold text-primary">Wanderly</span>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your trips..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              onClick={() => navigate("/my-dashboard")}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <User className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-10 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
            Good morning, traveler ✨
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to plan your next adventure? Your dream trip is just a few clicks away.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <button 
            onClick={() => navigate("/plan")}
            className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 text-left"
          >
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Plan New Trip</h3>
            <p className="text-sm text-muted-foreground">Start from scratch with AI assistance</p>
          </button>

          <button 
            onClick={() => navigate("/explore")}
            className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Explore Destinations</h3>
            <p className="text-sm text-muted-foreground">Get inspired by popular places</p>
          </button>

          <button 
            onClick={() => navigate("/flight-budget")}
            className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plane className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Flight Budget</h3>
            <p className="text-sm text-muted-foreground">Compare flight prices worldwide</p>
          </button>

          <button 
            onClick={() => navigate("/calendar")}
            className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">View Calendar</h3>
            <p className="text-sm text-muted-foreground">Manage reminders & trips</p>
          </button>
        </div>

        {/* Trips grid - Pinterest style */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-display font-semibold text-foreground">Your Trips</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {trips.map((trip, index) => (
            <div
              key={trip.id}
              onClick={() => navigate(`/itinerary/${trip.id}`)}
              className="break-inside-avoid group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-border hover:border-primary/20">
                <div className="relative overflow-hidden">
                  <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                      {trip.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {trip.destination}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {trip.dates}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-primary font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span>${trip.budget.toLocaleString()}</span>
                    <span className="text-muted-foreground font-normal">budget</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore India Section */}
        <div className="mt-16 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">Explore India 🇮🇳</h2>
            <p className="text-muted-foreground text-sm mt-1">Discover incredible destinations across the subcontinent</p>
          </div>
          <Button variant="ghost" size="sm">View all</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {indianDestinations.map((destination, index) => (
            <div
              key={destination.id}
              onClick={() => navigate("/plan")}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-border hover:border-primary/20">
                <div className="relative overflow-hidden h-40">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-semibold text-lg text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium text-sm">{destination.avgBudget}</span>
                    <span className="text-xs text-muted-foreground">avg. budget</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Foreign Countries Section */}
        <div className="mt-16 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">International Escapes 🌍</h2>
            <p className="text-muted-foreground text-sm mt-1">Dream big with these stunning global destinations</p>
          </div>
          <Button variant="ghost" size="sm">View all</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {foreignDestinations.map((destination, index) => (
            <div
              key={destination.id}
              onClick={() => navigate("/plan")}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-border hover:border-primary/20">
                <div className="relative overflow-hidden h-40">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-semibold text-lg text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium text-sm">{destination.avgBudget}</span>
                    <span className="text-xs text-muted-foreground">avg. budget</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </div>
  );
};

export default Dashboard;

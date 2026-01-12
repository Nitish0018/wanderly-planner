import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, DollarSign, Calendar, Users, Utensils, Camera, Mountain, Palette, Sparkles } from "lucide-react";
import { TripInput } from "@/types/trip";
import { toast } from "@/hooks/use-toast";

const activities = [
  { id: "food", label: "Food & Dining", icon: Utensils },
  { id: "sightseeing", label: "Sightseeing", icon: Camera },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "culture", label: "Arts & Culture", icon: Palette },
];

const PlanTrip = () => {
  const navigate = useNavigate();
  const [tripInput, setTripInput] = useState<TripInput>({
    destination: "",
    budget: 1500,
    days: 5,
    activities: [],
    travelers: 2
  });

  const toggleActivity = (activityId: string) => {
    setTripInput(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(a => a !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors: string[] = [];

    if (!tripInput.destination.trim()) {
      errors.push("Destination is required");
    }

    if (tripInput.budget < 100 || tripInput.budget > 100000) {
      errors.push("Budget must be between $100 and $100,000");
    }

    if (tripInput.days < 1 || tripInput.days > 30) {
      errors.push("Trip duration must be between 1 and 30 days");
    }

    if (tripInput.travelers < 1 || tripInput.travelers > 20) {
      errors.push("Number of travelers must be between 1 and 20");
    }

    if (tripInput.activities.length === 0) {
      errors.push("Please select at least one activity preference");
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(". "),
        variant: "destructive"
      });
      return;
    }

    // Pass trip input via router state instead of localStorage for security
    navigate("/thinking", { state: { tripInput } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
              Let's plan something amazing
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your dream trip and we'll create the perfect itinerary
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination */}
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <MapPin className="w-4 h-4 text-accent" />
                Where do you want to go?
              </label>
              <Input
                type="text"
                placeholder="e.g., Paris, Tokyo, New York..."
                value={tripInput.destination}
                onChange={(e) => setTripInput(prev => ({ ...prev, destination: e.target.value }))}
                className="text-lg"
              />
            </div>

            {/* Budget & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                  <DollarSign className="w-4 h-4 text-accent" />
                  Total Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="100"
                    max="100000"
                    step="50"
                    value={tripInput.budget}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setTripInput(prev => ({ ...prev, budget: Math.min(100000, Math.max(100, val)) }));
                    }}
                    className="pl-8 text-lg"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  We'll optimize your trip to stay within budget
                </p>
              </div>

              <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  Number of Days
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setTripInput(prev => ({ ...prev, days: Math.max(1, prev.days - 1) }))}
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-medium hover:bg-secondary transition-colors"
                  >
                    −
                  </button>
                  <span className="text-3xl font-display font-semibold text-foreground flex-1 text-center">
                    {tripInput.days}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTripInput(prev => ({ ...prev, days: prev.days + 1 }))}
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-medium hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <Users className="w-4 h-4 text-accent" />
                How many travelers?
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setTripInput(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-medium hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="text-3xl font-display font-semibold text-foreground">
                  {tripInput.travelers}
                </span>
                <button
                  type="button"
                  onClick={() => setTripInput(prev => ({ ...prev, travelers: prev.travelers + 1 }))}
                  className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-medium hover:bg-secondary transition-colors"
                >
                  +
                </button>
                <span className="text-muted-foreground ml-2">
                  {tripInput.travelers === 1 ? "Solo adventure" : tripInput.travelers === 2 ? "Perfect duo" : "Group trip"}
                </span>
              </div>
            </div>

            {/* Activities */}
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                What interests you?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {activities.map((activity) => {
                  const isSelected = tripInput.activities.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => toggleActivity(activity.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                        }`}
                    >
                      <activity.icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {activity.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={!tripInput.destination}
            >
              <Sparkles className="w-5 h-5" />
              Create My Itinerary
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PlanTrip;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Lock,
  Save,
  Share2,
  Coffee,
  Camera,
  Utensils,
  Sun,
  Moon,
  Loader2
} from "lucide-react";
import SignupPromptDialog from "@/components/SignupPromptDialog";
import { toast } from "@/hooks/use-toast";

const DemoPlanner = () => {
  const navigate = useNavigate();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [lockedFeature, setLockedFeature] = useState("");

  // Form state
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const handleLockedFeature = (feature: string) => {
    setLockedFeature(feature);
    setShowSignupPrompt(true);
  };

  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors: string[] = [];

    if (!destination.trim()) {
      errors.push("Destination is required");
    }

    const budgetNum = parseInt(budget);
    if (!budget.trim() || isNaN(budgetNum) || budgetNum < 100 || budgetNum > 100000) {
      errors.push("Budget must be between $100 and $100,000");
    }

    const daysNum = parseInt(days);
    if (!days.trim() || isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      errors.push("Trip duration must be between 1 and 30 days");
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(". "),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowItinerary(true);
    }, 1500);
  };

  const day1Activities = [
    {
      time: "8:00 AM",
      title: "Breakfast at Local Café",
      location: "Café Central",
      duration: "1 hour",
      cost: `$${Math.round(parseInt(budget) * 0.05) || 15}`,
      icon: Coffee,
    },
    {
      time: "10:00 AM",
      title: "Visit Historic Old Town",
      location: "Old Town Square",
      duration: "2 hours",
      cost: "Free",
      icon: Camera,
    },
    {
      time: "12:30 PM",
      title: "Lunch at Traditional Restaurant",
      location: "The Local Kitchen",
      duration: "1.5 hours",
      cost: `$${Math.round(parseInt(budget) * 0.08) || 25}`,
      icon: Utensils,
    },
    {
      time: "2:30 PM",
      title: "Afternoon City Tour",
      location: "City Center",
      duration: "3 hours",
      cost: `$${Math.round(parseInt(budget) * 0.1) || 30}`,
      icon: Sun,
    },
    {
      time: "7:00 PM",
      title: "Dinner & Evening Walk",
      location: "Riverside District",
      duration: "2 hours",
      cost: `$${Math.round(parseInt(budget) * 0.12) || 40}`,
      icon: Moon,
    },
  ];

  const estimatedDailySpend = day1Activities.reduce((sum, act) => {
    const cost = act.cost === "Free" ? 0 : parseInt(act.cost.replace("$", "")) || 0;
    return sum + cost;
  }, 0);

  if (!showItinerary) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="font-display font-semibold text-lg">Try Demo</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-semibold mb-2">Plan Your Trip</h2>
                <p className="text-muted-foreground text-sm">
                  Enter your details to preview Day 1 of your itinerary
                </p>
              </div>

              <form onSubmit={handleGeneratePreview} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    type="text"
                    placeholder="e.g. Paris, Tokyo, New York"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g. 1500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="100"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
                  <Input
                    id="days"
                    type="number"
                    placeholder="e.g. 5"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    min="1"
                    max="30"
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isGenerating || !destination.trim() || !budget.trim() || !days.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Preview...
                    </>
                  ) : (
                    "Preview Day 1"
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Free preview • No account required
              </p>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setShowItinerary(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-display font-semibold text-lg">Demo Trip: {destination}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLockedFeature("saving trips")}
            >
              <Lock className="w-3 h-3 mr-1" />
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLockedFeature("sharing trips")}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Trip Overview */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-semibold mb-2">{destination} Adventure</h2>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {days} Days
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ~${budget} total
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: Math.min(parseInt(days) || 5, 5) }, (_, i) => i + 1).map((day) => (
                  <Button
                    key={day}
                    variant={day === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => day > 1 && handleLockedFeature(`Day ${day}`)}
                    className={day > 1 ? "opacity-60 relative" : ""}
                  >
                    {day > 1 && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-muted-foreground" />}
                    Day {day}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Day 1 Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold">Day 1 - Arrival & Exploration</h3>
              <span className="text-sm text-muted-foreground">Est. spend: ${estimatedDailySpend}</span>
            </div>

            <div className="space-y-4">
              {day1Activities.map((activity, index) => (
                <Card key={index} className="p-4 hover:shadow-soft transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <activity.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {activity.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Locked Days Preview */}
          <div className="mt-8 space-y-4">
            {Array.from({ length: Math.min(parseInt(days) || 5, 5) - 1 }, (_, i) => i + 2).map((day) => (
              <Card
                key={day}
                className="p-6 opacity-60 cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden"
                onClick={() => handleLockedFeature(`Day ${day}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-background/80" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-semibold text-foreground">Day {day}</h4>
                      <p className="text-sm text-muted-foreground">
                        More adventures in {destination}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Lock className="w-3 h-3 mr-2" />
                    Unlock
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-12 p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-display font-semibold mb-2">Ready to see the full trip?</h3>
            <p className="text-muted-foreground mb-6">
              Create a free account to unlock all {days} days and save your personalized itinerary.
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate("/signup")}>
              Create Free Account
            </Button>
          </Card>
        </div>
      </main>

      <SignupPromptDialog
        open={showSignupPrompt}
        onOpenChange={setShowSignupPrompt}
        feature={lockedFeature}
      />
    </div>
  );
};

export default DemoPlanner;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, DollarSign, Calendar, Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-travel-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      {/* Navigation */}
      <nav className="relative container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-semibold text-primary">Wanderly</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => navigate("/login?mode=signup")}>
            Get started
          </Button>
        </div>
      </nav>

      {/* Hero section */}
      <main className="relative container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">AI-Powered Travel Planning</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground leading-tight mb-6">
            Travel smarter,<br />
            <span className="text-primary">not harder.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us your destination, budget, and interests. Our AI crafts the perfect 
            itinerary—complete with activities, timing, and cost breakdowns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              variant="outline" 
              size="xl" 
              onClick={() => navigate("/demo")}
              className="w-full sm:w-auto"
            >
              Start Planning Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/login?mode=signup")}
              className="w-full sm:w-auto"
            >
              Create Account
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border text-left hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Any Destination
              </h3>
              <p className="text-muted-foreground text-sm">
                From bustling cities to remote hideaways—we plan it all.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border text-left hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Budget Smart
              </h3>
              <p className="text-muted-foreground text-sm">
                Stay on budget with optimized spending and clear breakdowns.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border text-left hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Day-by-Day
              </h3>
              <p className="text-muted-foreground text-sm">
                Detailed daily plans with timing, locations, and activities.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              © 2024 Wanderly. Made with love for travelers.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

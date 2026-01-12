import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Search, RefreshCw, Check, Sparkles } from "lucide-react";
import { TripInput } from "@/types/trip";
import { PlanningPhase } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface PhaseInfo {
  icon: typeof Compass;
  title: string;
  description: string;
}

const phases: Record<PlanningPhase, PhaseInfo> = {
  planning: {
    icon: Compass,
    title: "Crafting your journey...",
    description: "Exploring the best experiences your destination has to offer"
  },
  checking: {
    icon: Search,
    title: "Checking your budget...",
    description: "Making sure every dollar counts towards unforgettable moments"
  },
  replanning: {
    icon: RefreshCw,
    title: "Optimizing the plan...",
    description: "Fine-tuning your itinerary for the perfect balance"
  },
  complete: {
    icon: Check,
    title: "Your adventure awaits!",
    description: "We've created something special just for you"
  }
};

const ThinkingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tripInput = (location.state as { tripInput?: TripInput })?.tripInput;
  const [currentPhase, setCurrentPhase] = useState<PlanningPhase>("planning");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate tripInput exists
    if (!tripInput) {
      toast({
        title: "Error",
        description: "No trip details found. Please start from the planning page.",
        variant: "destructive"
      });
      navigate('/plan');
      return;
    }

    const phaseSequence: PlanningPhase[] = ["planning", "checking", "replanning", "complete"];
    let currentIndex = 0;

    const phaseInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex < phaseSequence.length) {
        setCurrentPhase(phaseSequence[currentIndex]);
      }
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    const redirectTimeout = setTimeout(() => {
      // Pass trip input to the itinerary page via router state
      navigate("/itinerary/new", { state: { tripInput } });
    }, 8500);

    // Timeout protection - 30 seconds
    const errorTimeout = setTimeout(() => {
      setError("Request timed out. This is taking longer than expected.");
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
      clearTimeout(redirectTimeout);
    }, 30000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
      clearTimeout(redirectTimeout);
      clearTimeout(errorTimeout);
    };
  }, [navigate, tripInput]);

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/plan')}>
              Try Again
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const CurrentIcon = phases[currentPhase].icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        {/* Animated icon */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Background circles */}
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-4 rounded-full bg-primary/10" />

          {/* Main icon container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl gradient-accent flex items-center justify-center shadow-card animate-thinking">
              <CurrentIcon className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Phase info */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3 animate-slide-up">
            {phases[currentPhase].title}
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in">
            {phases[currentPhase].description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-muted-foreground">Creating magic...</span>
            <span className="text-primary font-medium">{progress}%</span>
          </div>
        </div>

        {/* Phase indicators */}
        <div className="flex justify-center gap-3">
          {(["planning", "checking", "replanning", "complete"] as PlanningPhase[]).map((phase, index) => {
            const phaseIndex = ["planning", "checking", "replanning", "complete"].indexOf(currentPhase);
            const isActive = index <= phaseIndex;
            const isCurrent = phase === currentPhase;

            return (
              <div
                key={phase}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${isCurrent
                    ? "w-8 gradient-accent"
                    : isActive
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
              />
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-2 opacity-30">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-soft" />
          <Sparkles className="w-4 h-4 text-accent animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="w-4 h-4 text-primary animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};

export default ThinkingScreen;

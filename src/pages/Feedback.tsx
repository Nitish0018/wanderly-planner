import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Heart, Send, Sparkles } from "lucide-react";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-24 h-24 rounded-full gradient-accent flex items-center justify-center mx-auto mb-8 shadow-card">
            <Heart className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-semibold text-foreground mb-4">
            Thank you for sharing!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your feedback helps us create even better travel experiences. 
            We're constantly learning and improving.
          </p>
          <Button 
            onClick={() => navigate("/dashboard")}
            variant="hero" 
            size="lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-xl">
        <div className="animate-slide-up">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 shadow-card">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-semibold text-foreground mb-3">
              How was your experience?
            </h1>
            <p className="text-muted-foreground text-lg">
              We crafted this itinerary just for you. Let us know how we did!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div className="bg-card rounded-3xl p-8 shadow-soft border border-border text-center">
              <p className="text-sm font-medium text-foreground mb-4">
                Rate your itinerary
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted stroke-2"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {rating === 0 && "Tap to rate"}
                {rating === 1 && "We can do better"}
                {rating === 2 && "Needs improvement"}
                {rating === 3 && "It was okay"}
                {rating === 4 && "Really good!"}
                {rating === 5 && "Absolutely perfect!"}
              </p>
            </div>

            {/* Feedback text */}
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Tell us more (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you love? What could be better? Any suggestions for future trips?"
                rows={5}
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary resize-none"
              />
            </div>

            {/* Quick tags */}
            <div className="bg-card rounded-3xl p-6 shadow-soft border border-border">
              <p className="text-sm font-medium text-foreground mb-4">
                What stood out? (select all that apply)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Great recommendations",
                  "Within budget",
                  "Good timing",
                  "Variety of activities",
                  "Clear explanations",
                  "Easy to follow"
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="px-4 py-2 rounded-full border-2 border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors focus:border-primary focus:text-primary"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              variant="hero" 
              size="xl" 
              className="w-full"
              disabled={rating === 0}
            >
              <Send className="w-5 h-5" />
              Send Feedback
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Your feedback is anonymous and helps improve our AI
          </p>
        </div>
      </main>
    </div>
  );
};

export default Feedback;

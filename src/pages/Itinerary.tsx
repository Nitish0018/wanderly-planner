import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, Clock, MapPin, Lightbulb, MessageSquare, Share2, Download, ChevronDown, ChevronUp } from "lucide-react";
import { DayPlan, Activity } from "@/types/trip";
import { toast } from "@/hooks/use-toast";

const sampleDays: DayPlan[] = [
  {
    day: 1,
    date: "March 15, 2024",
    theme: "Arrival & Temple Discovery",
    dailyCost: 180,
    activities: [
      {
        id: "1",
        name: "Fushimi Inari Shrine",
        description: "Walk through thousands of vermillion torii gates at Japan's most iconic shrine",
        time: "08:00",
        duration: "3 hours",
        cost: 0,
        location: "Fushimi-ku, Kyoto",
        category: "culture"
      },
      {
        id: "2",
        name: "Traditional Lunch at Nishiki Market",
        description: "Sample local delicacies at Kyoto's famous food market",
        time: "12:00",
        duration: "2 hours",
        cost: 35,
        location: "Nakagyo Ward",
        category: "food"
      },
      {
        id: "3",
        name: "Kinkaku-ji (Golden Pavilion)",
        description: "Visit the stunning gold-leaf covered Zen temple",
        time: "15:00",
        duration: "2 hours",
        cost: 5,
        location: "Kita Ward, Kyoto",
        category: "sightseeing"
      },
      {
        id: "4",
        name: "Kaiseki Dinner Experience",
        description: "Enjoy a multi-course traditional Japanese dinner",
        time: "19:00",
        duration: "2 hours",
        cost: 140,
        location: "Gion District",
        category: "food"
      }
    ]
  },
  {
    day: 2,
    date: "March 16, 2024",
    theme: "Bamboo & Zen Gardens",
    dailyCost: 145,
    activities: [
      {
        id: "5",
        name: "Arashiyama Bamboo Grove",
        description: "Wander through the enchanting bamboo forest at sunrise",
        time: "07:00",
        duration: "2 hours",
        cost: 0,
        location: "Arashiyama, Kyoto",
        category: "sightseeing"
      },
      {
        id: "6",
        name: "Tenryu-ji Temple & Garden",
        description: "Explore one of Kyoto's most important Zen temples",
        time: "10:00",
        duration: "2 hours",
        cost: 10,
        location: "Arashiyama, Kyoto",
        category: "culture"
      },
      {
        id: "7",
        name: "Matcha Tea Ceremony",
        description: "Participate in an authentic tea ceremony with local hosts",
        time: "14:00",
        duration: "1.5 hours",
        cost: 45,
        location: "Higashiyama",
        category: "culture"
      },
      {
        id: "8",
        name: "Pontocho Alley Dinner",
        description: "Dine along the atmospheric narrow lantern-lit alley",
        time: "18:30",
        duration: "2 hours",
        cost: 90,
        location: "Pontocho, Kyoto",
        category: "food"
      }
    ]
  },
  {
    day: 3,
    date: "March 17, 2024",
    theme: "Cultural Immersion",
    dailyCost: 165,
    activities: [
      {
        id: "9",
        name: "Gion Morning Walk",
        description: "Explore the geisha district and spot maiko heading to appointments",
        time: "08:00",
        duration: "2 hours",
        cost: 0,
        location: "Gion District",
        category: "sightseeing"
      },
      {
        id: "10",
        name: "Kiyomizu-dera Temple",
        description: "Visit the famous wooden temple with panoramic city views",
        time: "11:00",
        duration: "2.5 hours",
        cost: 5,
        location: "Higashiyama, Kyoto",
        category: "culture"
      },
      {
        id: "11",
        name: "Kimono Rental Experience",
        description: "Dress in traditional kimono and stroll through historic streets",
        time: "14:00",
        duration: "4 hours",
        cost: 60,
        location: "Higashiyama",
        category: "culture"
      },
      {
        id: "12",
        name: "Farewell Dinner at Ryokan",
        description: "Traditional inn dinner with seasonal Kyoto cuisine",
        time: "19:00",
        duration: "2 hours",
        cost: 100,
        location: "Central Kyoto",
        category: "food"
      }
    ]
  }
];

const categoryColors: Record<string, string> = {
  food: "bg-amber-100 text-amber-700",
  sightseeing: "bg-blue-100 text-blue-700",
  adventure: "bg-green-100 text-green-700",
  culture: "bg-purple-100 text-purple-700",
  relaxation: "bg-pink-100 text-pink-700"
};

const Itinerary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showExplanation, setShowExplanation] = useState(true);

  const totalCost = sampleDays.reduce((sum, day) => sum + day.dailyCost, 0);
  const budget = 2500;
  const remaining = budget - totalCost;
  const destination = "Kyoto, Japan";
  const days = sampleDays.length;

  const handleShare = async () => {
    const shareText = `Check out my ${days}-day trip to ${destination}! Budget: $${budget}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Trip to ${destination}`,
          text: shareText,
          url: shareUrl
        });
        toast({ title: "Shared!", description: "Trip shared successfully" });
      } catch (err: any) {
        // User cancelled share
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link copied!", description: "Share this link with friends" });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive"
        });
      }
    }
  };

  const handleDownload = () => {
    // Generate formatted text content
    let content = `${destination.toUpperCase()} ITINERARY\n`;
    content += `${'='.repeat(50)}\n\n`;
    content += `Budget: $${budget.toLocaleString()}\n`;
    content += `Estimated Cost: $${totalCost.toLocaleString()}\n`;
    content += `Remaining: $${remaining.toLocaleString()}\n\n`;

    sampleDays.forEach(day => {
      content += `\n${'='.repeat(50)}\n`;
      content += `DAY ${day.day}: ${day.theme}\n`;
      content += `Date: ${day.date} | Daily Cost: $${day.dailyCost}\n`;
      content += `${'='.repeat(50)}\n\n`;

      day.activities.forEach(activity => {
        content += `${activity.time} - ${activity.name}\n`;
        content += `  Location: ${activity.location}\n`;
        content += `  Duration: ${activity.duration}\n`;
        content += `  Cost: ${activity.cost === 0 ? 'Free' : '$' + activity.cost}\n`;
        content += `  ${activity.description}\n\n`;
      });
    });

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination.replace(/[^a-z0-9]/gi, '_')}_itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "Downloaded!", description: "Itinerary saved to your device" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
            Kyoto, Japan
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            3 magical days exploring ancient temples, hidden gardens, and culinary delights
          </p>

          {/* Budget summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
              <p className="text-sm text-muted-foreground mb-1">Budget</p>
              <p className="text-2xl font-display font-semibold text-foreground">${budget.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
              <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
              <p className="text-2xl font-display font-semibold text-primary">${totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
              <p className="text-sm text-muted-foreground mb-1">Remaining</p>
              <p className="text-2xl font-display font-semibold text-accent">${remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Why this plan */}
        {showExplanation && (
          <div className="bg-card rounded-3xl p-6 shadow-soft border border-border mb-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Why this plan works for you</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We've balanced cultural immersion with culinary experiences, starting each day with low-cost activities like temple visits and ending with memorable dining.
                  The Kaiseki dinner on day one sets the tone, while the tea ceremony adds depth to your cultural journey.
                  We've kept 20% of your budget as a buffer for spontaneous discoveries!
                </p>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Day-by-day itinerary */}
        <div className="space-y-4">
          {sampleDays.map((day) => (
            <div
              key={day.day}
              className="bg-card rounded-3xl shadow-soft border border-border overflow-hidden animate-fade-in"
              style={{ animationDelay: `${day.day * 100}ms` }}
            >
              {/* Day header */}
              <button
                onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-semibold">{day.day}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-semibold text-lg text-foreground">{day.theme}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {day.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${day.dailyCost}
                      </span>
                    </div>
                  </div>
                </div>
                {expandedDay === day.day ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Activities */}
              {expandedDay === day.day && (
                <div className="px-6 pb-6 space-y-4">
                  {day.activities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="relative pl-8 pb-4 last:pb-0"
                    >
                      {/* Timeline */}
                      {index < day.activities.length - 1 && (
                        <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-border" />
                      )}
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>

                      <div className="bg-muted/30 rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{activity.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {activity.time} · {activity.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {activity.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-foreground">
                              {activity.cost === 0 ? "Free" : `$${activity.cost}`}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[activity.category]}`}>
                          {activity.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feedback CTA */}
        <div className="mt-10 text-center animate-fade-in">
          <p className="text-muted-foreground mb-4">
            How does this plan look? We'd love to hear your thoughts.
          </p>
          <Button
            onClick={() => navigate("/feedback")}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Share Feedback
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Itinerary;

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, User, CalendarDays, MapPin, LogOut,
  TrendingUp, Clock, CheckCircle2, Compass
} from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { getSafeErrorMessage } from "@/lib/error-utils";
import AuthForm from "@/components/AuthForm";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface Reminder {
  id: string;
  title: string;
  reminder_date: string;
  is_completed: boolean;
}

const PersonalDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", user.id)
        .order("reminder_date", { ascending: true });

      if (remindersError) throw remindersError;
      setReminders(remindersData || []);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      toast({
        title: "Error",
        description: getSafeErrorMessage(error, "Failed to load your data"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/dashboard");
  };

  const stats = {
    totalReminders: reminders.length,
    completedReminders: reminders.filter((r) => r.is_completed).length,
    upcomingReminders: reminders.filter(
      (r) => !r.is_completed && parseISO(r.reminder_date) >= new Date()
    ).length,
  };

  const upcomingReminders = reminders
    .filter((r) => !r.is_completed && parseISO(r.reminder_date) >= new Date())
    .slice(0, 5);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-semibold text-primary">My Dashboard</span>
            </div>
          </div>

          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
                Sign in to your Dashboard
              </h1>
              <p className="text-muted-foreground">
                Access your personal travel dashboard
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <AuthForm onSuccess={() => fetchUserData()} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-semibold text-foreground">
                    Welcome, {profile?.full_name || user.email?.split("@")[0] || "Traveler"}!
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Total Reminders</span>
                </div>
                <p className="text-3xl font-display font-semibold text-foreground">
                  {stats.totalReminders}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <p className="text-3xl font-display font-semibold text-foreground">
                  {stats.completedReminders}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Upcoming</span>
                </div>
                <p className="text-3xl font-display font-semibold text-foreground">
                  {stats.upcomingReminders}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/calendar")}
                className="group bg-card rounded-2xl p-5 shadow-soft border border-border hover:border-primary/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CalendarDays className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Calendar & Reminders</h3>
                    <p className="text-sm text-muted-foreground">Manage your travel reminders</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate("/explore")}
                className="group bg-card rounded-2xl p-5 shadow-soft border border-border hover:border-primary/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Explore Destinations</h3>
                    <p className="text-sm text-muted-foreground">Discover your next adventure</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Upcoming Reminders */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Upcoming Reminders
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigate("/calendar")}>
                  View all
                </Button>
              </div>

              {upcomingReminders.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No upcoming reminders</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => navigate("/calendar")}
                  >
                    Add your first reminder
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => {
                    const daysUntil = differenceInDays(parseISO(reminder.reminder_date), new Date());
                    return (
                      <div
                        key={reminder.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CalendarDays className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{reminder.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(reminder.reminder_date), "MMM d, yyyy")}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${daysUntil === 0
                            ? "bg-red-100 text-red-700"
                            : daysUntil <= 3
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {daysUntil === 0 ? "Today" : `${daysUntil}d`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PersonalDashboard;

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Plus, Clock, Trash2, Check, Compass } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AuthForm from "@/components/AuthForm";
import { getReminderErrorMessage } from "@/lib/error-utils";

interface Reminder {
  id: string;
  title: string;
  description: string | null;
  reminder_date: string;
  reminder_time: string | null;
  is_completed: boolean;
}

const CalendarReminders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [reminderTime, setReminderTime] = useState("");

  const fetchReminders = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", user.id)
        .order("reminder_date", { ascending: true });

      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Failed to fetch reminders:', error);
      toast({
        title: "Error",
        description: getReminderErrorMessage(error, "fetch"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user, fetchReminders]);

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from("reminders").insert({
        user_id: user.id,
        title,
        description: description || null,
        reminder_date: format(reminderDate, "yyyy-MM-dd"),
        reminder_time: reminderTime || null,
      });

      if (error) throw error;

      toast({ title: "Reminder added", description: "Your reminder has been saved." });
      setTitle("");
      setDescription("");
      setReminderTime("");
      setDialogOpen(false);
      fetchReminders();
    } catch (error) {
      console.error('Failed to add reminder:', error);
      toast({
        title: "Error",
        description: getReminderErrorMessage(error, "add"),
        variant: "destructive"
      });
    }
  };

  const toggleComplete = async (reminder: Reminder) => {
    try {
      const { error } = await supabase
        .from("reminders")
        .update({ is_completed: !reminder.is_completed })
        .eq("id", reminder.id);

      if (error) throw error;
      fetchReminders();
    } catch (error) {
      console.error('Failed to toggle reminder:', error);
      toast({
        title: "Error",
        description: getReminderErrorMessage(error, "update"),
        variant: "destructive"
      });
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const { error } = await supabase.from("reminders").delete().eq("id", id);

      if (error) throw error;

      toast({ title: "Deleted", description: "Reminder removed." });
      fetchReminders();
    } catch (error) {
      console.error('Failed to delete reminder:', error);
      toast({
        title: "Error",
        description: getReminderErrorMessage(error, "delete"),
        variant: "destructive"
      });
    }
  };

  const selectedDateReminders = reminders.filter((r) =>
    isSameDay(parseISO(r.reminder_date), selectedDate)
  );

  const datesWithReminders = reminders.map((r) => parseISO(r.reminder_date));

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
                <CalendarIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-semibold text-primary">Calendar</span>
            </div>
          </div>

          {user && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Reminder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddReminder} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Pack bags for trip"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add any notes..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {format(reminderDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={reminderDate}
                          onSelect={(date) => date && setReminderDate(date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time (optional)</Label>
                    <Input
                      id="time"
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Reminder
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
                Sign in to use Calendar
              </h1>
              <p className="text-muted-foreground">
                Create an account to save reminders and plan your trips
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <AuthForm onSuccess={() => fetchReminders()} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className={cn("p-3 pointer-events-auto")}
                  modifiers={{ hasReminder: datesWithReminders }}
                  modifiersStyles={{
                    hasReminder: {
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      borderRadius: "50%",
                    },
                  }}
                />
              </div>

              {/* Upcoming Reminders */}
              <div className="mt-6 bg-card rounded-2xl p-4 shadow-soft border border-border">
                <h3 className="font-semibold text-foreground mb-3">Upcoming</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {reminders
                    .filter((r) => !r.is_completed && parseISO(r.reminder_date) >= new Date())
                    .slice(0, 5)
                    .map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                      >
                        <CalendarIcon className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="truncate">{r.title}</span>
                        <span className="text-muted-foreground text-xs ml-auto">
                          {format(parseISO(r.reminder_date), "MMM d")}
                        </span>
                      </div>
                    ))}
                  {reminders.filter((r) => !r.is_completed).length === 0 && (
                    <p className="text-sm text-muted-foreground">No upcoming reminders</p>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Date Reminders */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedDateReminders.length} reminder(s)
                    </p>
                  </div>
                </div>

                {selectedDateReminders.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No reminders for this day</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        setReminderDate(selectedDate);
                        setDialogOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add reminder
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateReminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className={cn(
                          "p-4 rounded-xl border transition-all",
                          reminder.is_completed
                            ? "bg-muted/50 border-border"
                            : "bg-background border-border hover:border-primary/20"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleComplete(reminder)}
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                              reminder.is_completed
                                ? "bg-primary border-primary"
                                : "border-muted-foreground hover:border-primary"
                            )}
                          >
                            {reminder.is_completed && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <h3
                              className={cn(
                                "font-medium",
                                reminder.is_completed && "line-through text-muted-foreground"
                              )}
                            >
                              {reminder.title}
                            </h3>
                            {reminder.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {reminder.description}
                              </p>
                            )}
                            {reminder.reminder_time && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {reminder.reminder_time}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarReminders;

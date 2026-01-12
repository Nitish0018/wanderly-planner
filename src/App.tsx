import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlanTrip from "./pages/PlanTrip";
import ThinkingScreen from "./pages/ThinkingScreen";
import Itinerary from "./pages/Itinerary";
import Feedback from "./pages/Feedback";
import ExploreDestinations from "./pages/ExploreDestinations";
import CalendarReminders from "./pages/CalendarReminders";
import PersonalDashboard from "./pages/PersonalDashboard";
import FlightBudget from "./pages/FlightBudget";
import DemoPlanner from "./pages/DemoPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<DemoPlanner />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/plan" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />
            <Route path="/thinking" element={<ProtectedRoute><ThinkingScreen /></ProtectedRoute>} />
            <Route path="/itinerary/:id" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/explore" element={<ExploreDestinations />} />
            <Route path="/calendar" element={<ProtectedRoute><CalendarReminders /></ProtectedRoute>} />
            <Route path="/my-dashboard" element={<ProtectedRoute><PersonalDashboard /></ProtectedRoute>} />
            <Route path="/flight-budget" element={<FlightBudget />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

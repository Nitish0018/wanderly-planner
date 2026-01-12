export interface TripInput {
  destination: string;
  budget: number;
  days: number;
  activities: string[];
  travelers: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  duration: string;
  cost: number;
  location: string;
  category: 'food' | 'sightseeing' | 'adventure' | 'culture' | 'relaxation';
  image?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
  dailyCost: number;
}

export interface Itinerary {
  id: string;
  destination: string;
  totalBudget: number;
  totalCost: number;
  days: DayPlan[];
  explanation: string;
  createdAt: string;
  coverImage?: string;
}

export interface TripCard {
  id: string;
  destination: string;
  coverImage: string;
  dates: string;
  budget: number;
  status: 'planned' | 'ongoing' | 'completed';
}

export type PlanningPhase = 'planning' | 'checking' | 'replanning' | 'complete';

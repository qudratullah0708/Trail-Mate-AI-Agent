import type { Activity, PlannedActivity } from './activity';
import type { Accommodation } from './accommodation';

// Itinerary types for day-by-day trip planning
export interface ItineraryDay {
  date: string;
  dayNumber: number;
  activities: PlannedActivity[];
  accommodation?: Accommodation;
  
  // Day summary
  totalCost: number;
  totalActivities: number;
  estimatedWalkingTime: number; // in minutes
  estimatedTravelTime: number; // in minutes
  
  // Timing
  startTime?: string;
  endTime?: string;
  
  // Notes and recommendations
  notes?: string[];
  recommendations?: string[];
  weatherConsiderations?: string[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  name: string;
  
  // Trip overview
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalGuests: number;
  
  // Daily breakdown
  days: ItineraryDay[];
  
  // Summary
  totalCost: number;
  totalActivities: number;
  accommodations: Accommodation[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  version: number;
  status: 'draft' | 'optimized' | 'confirmed' | 'in-progress' | 'completed';
}

export interface ItineraryTemplate {
  id: string;
  name: string;
  description: string;
  destination: string;
  duration: number; // in days
  interests: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  estimatedCost: {
    min: number;
    max: number;
  };
  activities: Activity[];
  recommendations: string[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  activity?: PlannedActivity;
  type: 'activity' | 'travel' | 'meal' | 'free';
  notes?: string;
}

export interface DaySchedule {
  date: string;
  timeSlots: TimeSlot[];
  totalScheduledTime: number;
  freeTime: number;
  conflicts: ScheduleConflict[];
}

export interface ScheduleConflict {
  type: 'overlap' | 'travel_time' | 'closed' | 'booking_required';
  timeSlotIds: string[];
  message: string;
  severity: 'low' | 'medium' | 'high';
  suggestions: string[];
}

export interface ItineraryOptimization {
  originalItinerary: Itinerary;
  optimizedItinerary: Itinerary;
  changes: ItineraryChange[];
  improvements: {
    costSavings: number;
    timeEfficiency: number;
    experienceScore: number;
  };
}

export interface ItineraryChange {
  type: 'add' | 'remove' | 'move' | 'replace' | 'time_change';
  dayNumber: number;
  activityId?: string;
  oldValue?: string | number | PlannedActivity;
  newValue?: string | number | PlannedActivity;
  reason: string;
  impact: {
    cost: number;
    time: number;
    experience: number;
  };
}

export interface ItineraryShare {
  id: string;
  itineraryId: string;
  shareCode: string;
  permissions: 'view' | 'edit' | 'comment';
  expiresAt?: string;
  accessCount: number;
  createdAt: string;
}

export interface ItineraryExport {
  format: 'pdf' | 'calendar' | 'json' | 'csv';
  includeImages: boolean;
  includeMap: boolean;
  includeCosts: boolean;
  includeNotes: boolean;
} 
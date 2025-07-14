// Activity types based on the Experience Planner Agent requirements
export interface Activity {
  id: string;
  name: string;
  type: 'attraction' | 'dining' | 'entertainment' | 'shopping' | 'adventure' | 'culture' | 'nature' | 'tour';
  category: string;
  subcategory?: string;
  
  // Basic information
  description: string;
  duration: number; // in minutes
  rating: number;
  reviewCount: number;
  
  // Location information
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromCenter: number; // in km
  
  // Pricing information
  price: number;
  priceLevel: 1 | 2 | 3 | 4; // 1 = budget, 4 = expensive
  currency: string;
  priceDescription?: string; // e.g., "per person", "per group"
  
  // Availability and timing
  openingHours: {
    [day: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  bestTimeToVisit?: string[];
  seasonality?: 'year-round' | 'seasonal';
  
  // Media and content
  images: string[];
  thumbnailUrl: string;
  website?: string;
  bookingUrl?: string;
  
  // Categorization and matching
  interests: string[]; // matches user interests
  tags: string[];
  ageGroups: string[]; // e.g., 'family-friendly', 'adults-only'
  groupSize: {
    min?: number;
    max?: number;
    recommended?: number;
  };
  
  // Quality metrics
  popularityScore: number;
  interestMatchScore: number; // how well it matches user interests
  valueScore: number;
  
  // Additional details
  highlights?: string[];
  tips?: string[];
  requirements?: string[]; // e.g., "booking required", "dress code"
  accessibility?: string[];
}

export interface ActivityFilters {
  priceRange: {
    min: number;
    max: number;
  };
  priceLevel: number[]; // array of price levels 1-4
  rating: {
    min: number;
  };
  duration: {
    min?: number; // in minutes
    max?: number;
  };
  types: string[];
  categories: string[];
  interests: string[];
  tags: string[];
  openNow?: boolean;
  bookingRequired?: boolean;
  familyFriendly?: boolean;
  sortBy: 'rating' | 'price' | 'distance' | 'popularity' | 'match';
  sortOrder: 'asc' | 'desc';
}

export interface ActivitySearchParams {
  destination: string;
  dates: string[];
  interests: string[];
  standard: 'economy' | 'standard' | 'luxury';
  filters?: ActivityFilters;
}

export interface ActivitySearchResponse {
  activities: Activity[];
  total: number;
  searchParams: ActivitySearchParams;
  suggestions?: string[];
  filters: {
    priceRange: { min: number; max: number };
    availableTypes: string[];
    availableCategories: string[];
    availableInterests: string[];
  };
}

// Day planning types
export interface PlannedActivity extends Activity {
  plannedDate: string;
  plannedTime: string;
  estimatedDuration: number;
  travelTimeToNext?: number; // in minutes
  notes?: string;
}

export interface DayPlan {
  date: string;
  activities: PlannedActivity[];
  totalCost: number;
  totalDuration: number; // in minutes
  estimatedTravelTime: number; // in minutes
} 
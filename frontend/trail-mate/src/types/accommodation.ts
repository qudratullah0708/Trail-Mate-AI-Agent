// Accommodation types based on the Accommodation Agent requirements
export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'apartment' | 'hostel' | 'resort' | 'guesthouse';
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  
  // Location information
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromCenter: number; // in km
  
  // Amenities and features
  amenities: string[];
  roomType: string;
  maxGuests: number;
  
  // Images and media
  images: string[];
  thumbnailUrl: string;
  
  // Booking information
  bookingUrl: string;
  provider: 'booking.com' | 'airbnb' | 'expedia' | 'other';
  availability: boolean;
  cancellationPolicy: string;
  
  // Additional details
  description?: string;
  highlights?: string[];
  nearbyAttractions?: string[];
  
  // Ranking factors
  valueScore: number; // price/quality ratio
  locationScore: number;
  overallScore: number;
}

export interface AccommodationFilters {
  priceRange: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
  };
  amenities: string[];
  accommodationType: string[];
  distanceFromCenter: number; // max distance in km
  sortBy: 'price' | 'rating' | 'distance' | 'value';
  sortOrder: 'asc' | 'desc';
}

export interface AccommodationSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
  filters?: AccommodationFilters;
}

export interface AccommodationSearchResponse {
  accommodations: Accommodation[];
  total: number;
  searchParams: AccommodationSearchParams;
  suggestions?: string[];
  filters: {
    priceRange: { min: number; max: number };
    availableAmenities: string[];
    accommodationTypes: string[];
  };
} 
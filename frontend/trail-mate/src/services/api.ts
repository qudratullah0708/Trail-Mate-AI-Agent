// API service for TrailMate backend communication

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface PlanTripRequest {
  query: string;
}

export interface PlanTripResponse {
  message: string;
  plan?: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    budget: {
      min: number;
      max: number;
    };
    accommodation?: {
      title: string;
      price: number;
      location: string;
      rating: number;
      reviews: number;
      url: string;
    };
    activities?: Array<{
      name: string;
      cost: number;
      description: string;
      day?: number;
    }>;
    totalCost?: number;
    itinerary?: Array<{
      day: number;
      date: string;
      activities: string[];
      cost: number;
    }>;
  };
}

export class ApiService {
  static async planTrip(request: PlanTripRequest): Promise<PlanTripResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/plan-trip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export default ApiService; 
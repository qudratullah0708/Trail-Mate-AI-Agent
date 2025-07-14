// API service for TrailMate backend communication

// API endpoints - production first, local fallback
const API_ENDPOINTS = [
  'https://trail-mate-ai-agent-7sgi.vercel.app',
  'http://127.0.0.1:8000'
];

export interface PlanTripRequest {
  query: string;
}

export interface PlanTripResponse {
  message?: string;
  intent?: string;
  response?: string;
  optimized_plan?: string;
  extracted_data?: {
    destination?: string;
    check_in?: string;
    check_out?: string;
    guests?: number;
    min_budget?: number;
    max_budget?: number;
  };
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

// Helper function to try multiple API endpoints
async function tryApiEndpoints(endpoint: string, options: RequestInit): Promise<Response> {
  let lastError: Error | null = null;
  
  for (const baseUrl of API_ENDPOINTS) {
    try {
      console.log(`Trying API endpoint: ${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      
      if (response.ok) {
        console.log(`Success with endpoint: ${baseUrl}${endpoint}`);
        return response;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      console.warn(`Failed with endpoint ${baseUrl}${endpoint}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }
  
  throw lastError || new Error('All API endpoints failed');
}

export class ApiService {
  static async planTrip(request: PlanTripRequest): Promise<PlanTripResponse> {
    try {
      const response = await tryApiEndpoints('/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await tryApiEndpoints('/health', {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export default ApiService; 
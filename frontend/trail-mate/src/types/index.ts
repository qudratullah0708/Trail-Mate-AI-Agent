// Core application types
import type { Accommodation } from './accommodation';
import type { Activity } from './activity';
import type { ItineraryDay } from './itinerary';
// import type { BudgetItem } from './budget'; // Removed, not used/exported


export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Trip related types
export interface TripParameters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minBudget: number;
  maxBudget: number;
  standard: 'economy' | 'standard' | 'luxury';
  interests: string[];
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  parameters: TripParameters;
  accommodations?: Accommodation[];
  activities?: Activity[];
  itinerary?: ItineraryDay[];
  totalCost?: number;
  status: 'planning' | 'optimizing' | 'completed' | 'saved';
  createdAt: string;
  updatedAt: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  agentType?: 'accommodation' | 'experience' | 'budget';
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  userId: string;
  tripId?: string;
  messages: ChatMessage[];
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Agent processing status
export interface AgentStatus {
  accommodation: 'idle' | 'processing' | 'completed' | 'error';
  experience: 'idle' | 'processing' | 'completed' | 'error';
  budget: 'idle' | 'processing' | 'completed' | 'error';
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Export all sub-types
export * from './accommodation';
export * from './activity';
export * from './itinerary';
export * from './budget'; 
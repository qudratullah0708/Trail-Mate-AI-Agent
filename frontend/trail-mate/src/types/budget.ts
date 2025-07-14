// Budget types based on the Budget Optimizer Agent requirements
export interface BudgetBreakdown {
  accommodation: number;
  activities: number;
  food: number;
  transportation: number;
  miscellaneous: number;
  total: number;
}

export interface BudgetConstraints {
  totalBudget: number;
  maxAccommodationPercentage?: number; // e.g., 60% of total budget
  maxActivitiesPercentage?: number;
  currency: string;
  perPerson: boolean;
}

export interface BudgetOptimization {
  id: string;
  tripId: string;
  originalBudget: BudgetConstraints;
  
  // Optimization results
  optimizedBreakdown: BudgetBreakdown;
  savings: number;
  adjustments: BudgetAdjustment[];
  
  // Alternative plans
  alternativePlans: BudgetPlan[];
  
  // Recommendations
  recommendations: string[];
  warnings: string[];
}

export interface BudgetAdjustment {
  type: 'accommodation' | 'activity' | 'remove' | 'replace';
  itemId: string;
  itemName: string;
  originalCost: number;
  newCost: number;
  savings: number;
  reason: string;
}

export interface BudgetPlan {
  id: string;
  name: string;
  description: string;
  totalCost: number;
  breakdown: BudgetBreakdown;
  accommodationId?: string;
  activityIds: string[];
  tradeOffs: string[];
  priority: 'budget' | 'comfort' | 'experience';
}

export interface BudgetAlert {
  type: 'warning' | 'error' | 'info';
  category: 'accommodation' | 'activities' | 'total';
  message: string;
  amount: number;
  percentage: number;
}

export interface BudgetPreferences {
  priorities: {
    accommodation: number; // 1-5 scale
    activities: number;
    food: number;
    comfort: number;
  };
  flexibleCategories: string[]; // categories where user is willing to compromise
  mustHave: string[]; // non-negotiable items
}

export interface CostEstimate {
  item: string;
  category: 'accommodation' | 'activity' | 'food' | 'transport' | 'misc';
  estimatedCost: number;
  confidence: 'low' | 'medium' | 'high';
  source: string;
  notes?: string;
} 
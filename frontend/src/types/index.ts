// API Types

export interface MaterialInput {
  name: string;
  percentage: number;
}

export interface ProductInput {
  product_name: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  materials: MaterialInput[];
  origin: string;
  care_instruction: string;
  certification1?: string;
  certification2?: string;
  price?: string;
}

export interface ImpactBreakdown {
  co2: number;
  water: number;
  energy: number;
}

export interface MaterialImpactBreakdown extends ImpactBreakdown {
  chemical: number;
}

export interface OriginImpactBreakdown {
  grid: number;
  transport: number;
  manufacturing: number;
}

export interface ScoreBreakdown {
  material_impact: MaterialImpactBreakdown;
  care_impact: ImpactBreakdown;
  origin_impact: OriginImpactBreakdown;
}

export interface ScoreResponse {
  product_name: string;
  brand: string;
  final_score: number;
  environmental_score: number;
  certification_bonus: number;
  breakdown: ScoreBreakdown;
}

export interface ProductSummary {
  id: number;
  product_name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: string | null;
  score: number;
}

export interface MaterialReference {
  name: string;
  category: string;
  carbon_kg_co2e: number;
  water_l: number;
  fossil_energy_mj: number;
  chemical_impact: number;
  notes: string;
}

export interface OriginReference {
  name: string;
  energy_grid_intensity: number;
  transport_impact: number;
  manufacturing_impact: number;
  notes: string;
}

export interface CareReference {
  name: string;
  energy_use_mj: number;
  water_use_l: number;
  co2_kg: number;
  notes: string;
}

export interface CertificationReference {
  name: string;
  category: string;
  score_bonus: number;
  description: string;
}

export interface PricePredictionInput {
  score: number;
  brand: string;
  category: string;
  subcategory: string;
}

export interface PricePredictionResponse {
  predicted_price: number;
  confidence: string;
  model_type: string;
}

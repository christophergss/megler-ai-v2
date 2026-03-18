export interface Property {
  id: string;
  user_id: string;
  address: string;
  city: string;
  zip_code: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  year_built: number;
  price: number;
  description: string;
  features: string[];
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface GeneratedText {
  id: string;
  user_id: string;
  property_id: string | null;
  title: string;
  content: string;
  text_type: string;
  tone: string;
  language: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company: string;
  phone: string;
  avatar_url: string;
  created_at: string;
}

export interface GeneratorStep {
  step: number;
  title: string;
  description: string;
}

export interface PropertyFormData {
  address: string;
  city: string;
  zip_code: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  year_built: number;
  price: number;
  description: string;
  features: string[];
}

export interface GenerateRequest {
  property: Partial<PropertyFormData>;
  textType: string;
  tone: string;
  extraInstructions: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalTexts: number;
  textsThisMonth: number;
  recentTexts: GeneratedText[];
}

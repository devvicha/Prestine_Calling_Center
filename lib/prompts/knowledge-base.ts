import knowledgeBaseData from './knowledge-base.json';

// Type definitions for the knowledge base structure
interface PriceMap {
  carMiniVan: number;
  crossover: number;
  suv: number;
  van: number;
}

interface Package {
  name: string;
  prices: PriceMap;
  description: string;
}

interface KnowledgeBase {
  brands: string[];
  vehicle_types: {
    carMiniVan: string;
    crossover: string;
    suv: string;
    van: string;
  };
  packages: {
    Standard: Package[];
    AutoGlym: Package[];
  };
}

// Knowledge base for Prestine Mobile Car Wash
// Contains service packages, pricing, coverage areas, and FAQs
export const KNOWLEDGE_BASE_JSON: KnowledgeBase = knowledgeBaseData as KnowledgeBase;

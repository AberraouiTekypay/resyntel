import {
  HeroKPIs,
  EnergyData,
  WaterData,
  CarbonData,
  Asset,
  Opportunity,
  PortfolioProperty,
  AIResponse
} from '@/types';
import {
  ZEPHYR_KPIS,
  ZEPHYR_ENERGY,
  ZEPHYR_WATER,
  ZEPHYR_CARBON,
  ZEPHYR_ASSETS,
  ZEPHYR_OPPORTUNITIES,
  ZEPHYR_PORTFOLIO,
  answerAIQuestion
} from './data-service';

const IS_BROWSER = typeof window !== 'undefined';

export const apiClient = {
  async getKPIs(): Promise<HeroKPIs> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/kpis');
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_KPIS;
  },

  async getEnergy(): Promise<EnergyData> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/energy');
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_ENERGY;
  },

  async getWater(): Promise<WaterData> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/water');
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_WATER;
  },

  async getCarbon(): Promise<CarbonData> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/carbon');
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_CARBON;
  },

  async getAssets(): Promise<Asset[]> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/assets');
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_ASSETS;
  },

  async getOpportunities(params?: { resource?: string; category?: string; sort_by?: string }): Promise<Opportunity[]> {
    try {
      if (IS_BROWSER) {
        const query = new URLSearchParams(params as any).toString();
        const res = await fetch(`/api/opportunities?${query}`);
        if (res.ok) {
          const data = await res.json();
          return data.items || data;
        }
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }

    let items = [...ZEPHYR_OPPORTUNITIES];
    if (params?.resource && params.resource !== 'all') {
      items = items.filter(o => o.resource_type.toLowerCase() === params.resource?.toLowerCase());
    }
    if (params?.category && params.category !== 'all') {
      items = items.filter(o => o.category.toLowerCase().includes(params.category!.toLowerCase()));
    }
    if (params?.sort_by === 'savings') {
      items.sort((a, b) => b.annual_saving_mad - a.annual_saving_mad);
    } else if (params?.sort_by === 'payback') {
      items.sort((a, b) => a.payback_months - b.payback_months);
    }
    return items;
  },

  async getOpportunityDetail(id: number): Promise<Opportunity | undefined> {
    try {
      if (IS_BROWSER) {
        const res = await fetch(`/api/opportunities/${id}`);
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_OPPORTUNITIES.find(o => o.id === id);
  },

  async getPortfolio(): Promise<PortfolioProperty[]> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          return data.properties || data;
        }
      }
    } catch (e) {
      console.warn('Falling back to local data store', e);
    }
    return ZEPHYR_PORTFOLIO;
  },

  async askAI(question: string, lang: 'en' | 'fr' = 'en'): Promise<AIResponse> {
    try {
      if (IS_BROWSER) {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, lang })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Falling back to local AI engine', e);
    }
    return answerAIQuestion(question, lang);
  }
};

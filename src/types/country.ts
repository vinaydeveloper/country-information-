export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  // Added mock data since the API doesn't provide these
  tourism?: {
    attractions: string[];
    description: string;
  };
  cuisine?: {
    dishes: string[];
    description: string;
  };
}
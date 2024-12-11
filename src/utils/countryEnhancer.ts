import { Country } from '../types/country';
import { countryDetails } from './mockData';

export function enhanceCountryData(country: Country): Country {
  const details = countryDetails[country.name.common];
  if (details) {
    return {
      ...country,
      tourism: details.tourism,
      cuisine: details.cuisine,
    };
  }
  return {
    ...country,
    tourism: {
      attractions: [`Visit ${country.capital?.[0] || 'the capital'}`, 'Local markets', 'Cultural sites'],
      description: `Explore the beautiful landscapes and rich culture of ${country.name.common}.`
    },
    cuisine: {
      dishes: ['Local specialties', 'Traditional dishes', 'Regional delicacies'],
      description: `Experience the authentic flavors of ${country.name.common}'s traditional cuisine.`
    }
  };
}
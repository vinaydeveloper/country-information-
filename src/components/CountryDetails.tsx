import { Utensils, MapPin } from 'lucide-react';
import { Country } from '../types/country';
import styles from './CountryDetails.module.css';

interface CountryDetailsProps {
  country: Country;
}

export function CountryDetails({ country }: CountryDetailsProps) {
  return (
    <div className={styles.details}>
      <div className={styles.section}>
        <h3>
          <MapPin size={18} />
          Popular Attractions
        </h3>
        <p className={styles.description}>{country.tourism?.description}</p>
        <ul className={styles.list}>
          {country.tourism?.attractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>
          <Utensils size={18} />
          Traditional Cuisine
        </h3>
        <p className={styles.description}>{country.cuisine?.description}</p>
        <ul className={styles.list}>
          {country.cuisine?.dishes.map((dish, index) => (
            <li key={index}>{dish}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
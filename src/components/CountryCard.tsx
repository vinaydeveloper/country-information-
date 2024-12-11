import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Country } from '../types/country';
import { CountryDetails } from './CountryDetails';
import styles from './CountryCard.module.css';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.flagContainer}>
        <img 
          src={country.flags.svg} 
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className={styles.flag}
        />
      </div>
      <div className={styles.info}>
        <h2>{country.name.common}</h2>
        <p>
          <Globe size={16} />
          Capital: {country.capital?.[0] || 'N/A'}
        </p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        
        <button 
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={20} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              Show more
            </>
          )}
        </button>

        {isExpanded && <CountryDetails country={country} />}
      </div>
    </div>
  );
}
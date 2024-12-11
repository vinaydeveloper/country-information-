import { useState, useEffect } from 'react';
import { Users, Globe2 } from 'lucide-react';
import styles from './FloatingStats.module.css';
import { Country } from '../types/country';

interface FloatingStatsProps {
  countries: Country[];
}

export function FloatingStats({ countries }: FloatingStatsProps) {
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const total = countries.reduce((acc, country) => acc + country.population, 0);
    setTotalPopulation(total);
    
    // Animate in after a delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [countries]);

  return (
    <div className={`${styles.stats} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.stat}>
        <Globe2 size={20} />
        <span>Countries: {countries.length}</span>
      </div>
      <div className={styles.stat}>
        <Users size={20} />
        <span>Population: {totalPopulation.toLocaleString()}</span>
      </div>
    </div>
  );
}
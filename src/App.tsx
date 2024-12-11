import { useState, useEffect } from 'react';
import { Sun, Moon, SortAsc } from 'lucide-react';
import { Country } from './types/country';
import { SearchBar } from './components/SearchBar';
import { CountryCard } from './components/CountryCard';
import { GlobeVisualization } from './components/GlobeVisualization';
import { FloatingStats } from './components/FloatingStats';
import { useTheme } from './hooks/useTheme';
import { enhanceCountryData } from './utils/countryEnhancer';
import styles from './App.module.css';

export function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        const enhancedData = data.map(enhanceCountryData);
        setCountries(enhancedData);
        setFilteredCountries(enhancedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSort = () => {
    const newSortBy = sortBy === 'name' ? 'population' : 'name';
    setSortBy(newSortBy);
    
    const sorted = [...filteredCountries].sort((a, b) => {
      if (newSortBy === 'name') {
        return a.name.common.localeCompare(b.name.common);
      }
      return b.population - a.population;
    });
    setFilteredCountries(sorted);
  };

  return (
    <div className={styles.app}>
      <GlobeVisualization />
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>World Explorer</h1>
          <p className={styles.subtitle}>Discover our beautiful planet</p>
        </div>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>

      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} />
        <button onClick={handleSort} className={styles.sortButton}>
          <SortAsc size={20} />
          Sort by {sortBy === 'name' ? 'Population' : 'Name'}
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loader}>
          <div className={styles.globe}></div>
          <p>Exploring the world...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredCountries.map(country => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}

      <FloatingStats countries={countries} />
    </div>
  );
}

export default App;
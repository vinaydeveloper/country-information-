interface CountryData {
  [key: string]: {
    tourism: {
      attractions: string[];
      description: string;
    };
    cuisine: {
      dishes: string[];
      description: string;
    };
  };
}

export const countryDetails: CountryData = {
  "France": {
    tourism: {
      attractions: ["Eiffel Tower", "Louvre Museum", "Palace of Versailles"],
      description: "Known for its iconic landmarks, art museums, and romantic atmosphere."
    },
    cuisine: {
      dishes: ["Croissant", "Coq au Vin", "Ratatouille"],
      description: "Famous for its sophisticated cuisine, fine wines, and pastries."
    }
  },
  "Japan": {
    tourism: {
      attractions: ["Mount Fuji", "Kyoto Temples", "Tokyo Tower"],
      description: "Blend of ancient traditions and modern technology."
    },
    cuisine: {
      dishes: ["Sushi", "Ramen", "Tempura"],
      description: "Known for its fresh ingredients, precise preparation, and unique flavors."
    }
  },
  // Add more countries as needed...
};
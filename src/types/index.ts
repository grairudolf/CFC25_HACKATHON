export interface Service {
  id: string;
  name: string;
  description: {
    en: string;
    fr: string;
    pid: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isVerified?: boolean;
  location?: string;
  website?: string;
}

// Define a type for the categorized service data if needed elsewhere
export interface CategorizedServices {
  recommended: Service[];
  latest: Service[];
  // Add other categories as needed
}

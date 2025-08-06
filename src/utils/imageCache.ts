interface ImageCacheEntry {
  url: string;
  timestamp: number;
}

class ImageCache {
  private cache: Map<string, ImageCacheEntry> = new Map();
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 hours
  
  // Predefined fallback images for common destinations
  private readonly fallbackImages: Record<string, string> = {
    'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    'barcelona': 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80',
    'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    'amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
    'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    'cancun': 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&q=80',
    'miami': 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&q=80',
    'los angeles': 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
    'san francisco': 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800&q=80',
    'las vegas': 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80',
  };
  
  get(key: string): string | null {
    const normalizedKey = key.toLowerCase();
    const entry = this.cache.get(normalizedKey);
    
    if (entry) {
      const isExpired = Date.now() - entry.timestamp > this.TTL;
      if (!isExpired) {
        return entry.url;
      } else {
        this.cache.delete(normalizedKey);
      }
    }
    
    return null;
  }
  
  set(key: string, url: string): void {
    const normalizedKey = key.toLowerCase();
    this.cache.set(normalizedKey, {
      url,
      timestamp: Date.now()
    });
  }
  
  getFallback(city: string): string | null {
    const normalizedCity = city.toLowerCase();
    return this.fallbackImages[normalizedCity] || null;
  }
  
  preload(cities: string[]): void {
    // Preload common destinations into cache
    cities.forEach(city => {
      const normalizedCity = city.toLowerCase();
      const fallback = this.fallbackImages[normalizedCity];
      if (fallback && !this.cache.has(normalizedCity)) {
        this.set(normalizedCity, fallback);
      }
    });
  }
  
  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache(); 
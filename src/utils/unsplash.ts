// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'jULiRCDDiieRck0mtLt6ffJDaP8Gk9bzHLbSLm2rT78';
const UNSPLASH_API_BASE = 'https://api.unsplash.com';

// Simple in-memory cache for API results
const imageCache = new Map<string, string>();

// Popular destination images (fallback)
const POPULAR_DESTINATIONS = new Map([
  // Europe
  ['paris', 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800'],
  ['london', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'], 
  ['rome', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'],
  ['barcelona', 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800'],
  ['amsterdam', 'https://images.unsplash.com/photo-1459679749680-18eb29c40cd8?w=800'],
  ['berlin', 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800'],
  ['vienna', 'https://images.unsplash.com/photo-1516550893923-42d407f9d2f8?w=800'],
  ['prague', 'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=800'],
  ['budapest', 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800'],
  ['lisbon', 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800'],
  ['madrid', 'https://images.unsplash.com/photo-1539650116574-75c0c6d65617?w=800'],
  ['athens', 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800'],
  ['stockholm', 'https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800'],
  ['copenhagen', 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800'],
  ['oslo', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
  ['helsinki', 'https://images.unsplash.com/photo-1539650116574-75c0c6d65617?w=800'],
  ['zurich', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['brussels', 'https://images.unsplash.com/photo-1559564484-dd734fc8eacb?w=800'],
  ['dublin', 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800'],
  ['edinburgh', 'https://images.unsplash.com/photo-1555297044-2b5ef4d9556a?w=800'],
  
  // Asia
  ['tokyo', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
  ['kyoto', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'],
  ['osaka', 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800'],
  ['seoul', 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800'],
  ['beijing', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800'],
  ['shanghai', 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800'],
  ['hong kong', 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800'],
  ['singapore', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800'],
  ['bangkok', 'https://images.unsplash.com/photo-1563492065273-8fbd5bbd5b62?w=800'],
  ['kuala lumpur', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800'],
  ['jakarta', 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800'],
  ['manila', 'https://images.unsplash.com/photo-1591124911175-82b7e21c2a35?w=800'],
  ['mumbai', 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800'],
  ['delhi', 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800'],
  ['dubai', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'],
  
  // Americas  
  ['new york', 'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800'],
  ['los angeles', 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=800'],
  ['san francisco', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['chicago', 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800'],
  ['miami', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['toronto', 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800'],
  ['vancouver', 'https://images.unsplash.com/photo-1549388604-817d15aa0968?w=800'],
  ['montreal', 'https://images.unsplash.com/photo-1535050793-6fad25e88f44?w=800'],
  ['mexico city', 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800'],
  ['cancun', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
  ['rio de janeiro', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800'],
  ['sao paulo', 'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800'],
  ['buenos aires', 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800'],
  ['lima', 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800'],
  
  // Africa & Oceania
  ['cape town', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800'],
  ['marrakech', 'https://images.unsplash.com/photo-1539650116574-75c0c6d65617?w=800'],
  ['cairo', 'https://images.unsplash.com/photo-1539650116574-75c0c6d65617?w=800'],
  ['sydney', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['melbourne', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['auckland', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  
  // France regions
  ['marseille', 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800'],
  ['lyon', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800'],
  ['nice', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['cannes', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  ['bordeaux', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
]);

// Unsplash API interface
interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description?: string;
  description?: string;
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

// Get curated image for popular destinations
export const getPopularCityImage = (cityName: string): string => {
  const normalizedCity = cityName.toLowerCase().trim();
  return POPULAR_DESTINATIONS.get(normalizedCity) || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
};

// Search Unsplash API for city images
const searchUnsplashImages = async (query: string): Promise<string | null> => {
  // Check cache first
  const cacheKey = query.toLowerCase().trim();
  if (imageCache.has(cacheKey)) {
    console.log(`🎯 Using cached image for: ${query}`);
    return imageCache.get(cacheKey) || null;
  }

  try {
    const searchQuery = encodeURIComponent(`${query} city architecture travel`);
    const url = `${UNSPLASH_API_BASE}/search/photos?query=${searchQuery}&per_page=1&order_by=popular&orientation=landscape`;
    
    console.log(`🔍 Fetching from Unsplash API for: ${query}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: UnsplashSearchResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      // Prefer regular size, fallback to small
      const imageUrl = photo.urls.regular || photo.urls.small || photo.urls.thumb;
      
      // Cache the result
      imageCache.set(cacheKey, imageUrl);
      console.log(`✅ Cached new image for: ${query}`);
      
      return imageUrl;
    }
    
    return null;
  } catch (error) {
    console.warn('Error fetching from Unsplash API:', error);
    return null;
  }
};

// Main function to get city image with API fallback to curated
export const getCityImage = async (destination: string): Promise<string> => {
  if (!destination) {
    return getPopularCityImage('');
  }

  const cityName = destination.split(',')[0].trim();
  
  // First try curated images for popular destinations
  const curatedImage = getPopularCityImage(cityName);
  const isDefaultFallback = curatedImage === 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
  
  // If we have a curated image (not the default fallback), use it
  if (!isDefaultFallback) {
    console.log(`🏛️ Using curated image for: ${cityName}`);
    return curatedImage;
  }
  
  // For destinations not in our curated list, try Unsplash API
  try {
    const apiImage = await searchUnsplashImages(cityName);
    if (apiImage) {
      console.log(`🌐 Using API image for: ${cityName}`);
      return apiImage;
    }
  } catch (error) {
    console.warn('Unsplash API failed, using fallback:', error);
  }
  
  // Final fallback to default image
  console.log(`🔄 Using fallback image for: ${cityName}`);
  return curatedImage;
}; 
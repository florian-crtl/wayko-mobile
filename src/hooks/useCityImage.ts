import { useState, useEffect, useMemo } from 'react';
import { getCityImage, getPopularCityImage } from 'utils/unsplash';

interface UseCityImageResult {
  imageUrl: string;
  isLoading: boolean;
}

export const useCityImage = (destination: string): UseCityImageResult => {
  const [apiImageUrl, setApiImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Get immediate fallback from curated images (synchronous)
  const immediateImage = useMemo(() => {
    if (!destination) {
      return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
    }
    const cityName = destination.split(',')[0].trim();
    return getPopularCityImage(cityName);
  }, [destination]);
  
  // Check if we have a good curated image (not the default fallback)
  const hasCuratedImage = immediateImage !== 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';

  useEffect(() => {
    // Skip API call if we already have a good curated image
    if (!destination || hasCuratedImage) {
      setIsLoading(false);
      return;
    }
    
    let isMounted = true;
    setIsLoading(true);
    
    // Only fetch from API if we don't have a curated image
    const fetchImage = async () => {
      try {
        const image = await getCityImage(destination);
        if (isMounted) {
          setApiImageUrl(image);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Error in useCityImage:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [destination, hasCuratedImage]);

  // Return API image if available, otherwise immediate curated image
  return { 
    imageUrl: apiImageUrl || immediateImage,
    isLoading 
  };
}; 
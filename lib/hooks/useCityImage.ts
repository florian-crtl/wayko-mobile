import { useState, useEffect } from 'react';
import { getCityImage } from 'lib/utils/unsplash';

interface UseCityImageResult {
  imageUrl: string;
  isLoading: boolean;
}

export const useCityImage = (destination: string): UseCityImageResult => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      if (!destination) {
        setImageUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const image = await getCityImage(destination);
        if (isMounted) {
          setImageUrl(image);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Error in useCityImage:', error);
        if (isMounted) {
          setImageUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [destination]);

  return { imageUrl, isLoading };
}; 
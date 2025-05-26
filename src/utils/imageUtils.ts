const BASE_URL = 'http://localhost:8180';

export const formatImageUrl = (imageUrl?: string): string => {
  if (!imageUrl) return '/placeholder.png';
  
  if (imageUrl.startsWith('/')) {
    return `${BASE_URL}${imageUrl}`;
  }
  
  return `${BASE_URL}/images/${imageUrl}`;
}; 
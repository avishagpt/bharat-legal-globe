
import { useState, useEffect } from 'react';
import { Lawyer } from '@/types';
import { getProfileImageByGender } from '@/services/ProfileImageService';

/**
 * Hook to fetch and apply appropriate gender-based profile images to lawyer data
 */
export function useLawyerImage<T extends { lawyers: Lawyer[], loading: boolean }>(
  initialState: T
): T & { setGenderImages: (lawyers: Lawyer[]) => Promise<Lawyer[]> } {
  const [state, setState] = useState<T>(initialState);

  // Function to fetch and set profile images for an array of lawyers
  const setGenderImages = async (lawyers: Lawyer[]): Promise<Lawyer[]> => {
    try {
      const lawyersWithImages = await Promise.all(
        lawyers.map(async (lawyer) => {
          try {
            // Get gender-appropriate image
            const imageUrl = await getProfileImageByGender(lawyer.gender);
            return { ...lawyer, imageUrl };
          } catch (error) {
            console.error(`Failed to get image for lawyer ${lawyer.id}:`, error);
            return lawyer; // Return original lawyer if image fetching fails
          }
        })
      );
      return lawyersWithImages;
    } catch (error) {
      console.error('Error setting gender images:', error);
      return lawyers;
    }
  };

  return {
    ...state,
    setGenderImages,
  };
}

export default useLawyerImage;

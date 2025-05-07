
/**
 * Service for fetching appropriate profile images based on gender using the randomuser.me API
 */

interface RandomUserResponse {
  results: {
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    gender: string;
  }[];
}

// Cache for profile images to avoid repeated API calls
const imageCache: Record<string, string[]> = {
  Male: [],
  Female: [],
  Other: [],
};

/**
 * Fetch a profile image URL based on gender
 * @param gender The gender to fetch an image for (Male, Female, Other)
 * @returns A URL to a profile image
 */
export const getProfileImageByGender = async (gender: "Male" | "Female" | "Other"): Promise<string> => {
  // If we have cached images for this gender, use one
  if (imageCache[gender] && imageCache[gender].length > 0) {
    // Take the first image from the cache and remove it
    const imageUrl = imageCache[gender].shift();
    // Return the image URL or a fallback if something went wrong
    return imageUrl || getDefaultImageForGender(gender);
  }

  try {
    // Map our gender types to randomuser API gender types
    const apiGender = gender === "Other" ? "female" : gender.toLowerCase();
    
    // Fetch 10 images at once to cache them
    const response = await fetch(`https://randomuser.me/api/?gender=${apiGender}&results=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile images');
    }
    
    const data: RandomUserResponse = await response.json();
    
    // Cache all images for future use
    imageCache[gender] = data.results.map(user => user.picture.large);
    
    // Return the first image or fallback if no results
    return imageCache[gender].shift() || getDefaultImageForGender(gender);
  } catch (error) {
    console.error('Error fetching profile image:', error);
    return getDefaultImageForGender(gender);
  }
};

/**
 * Get a default image URL for a given gender if the API fails
 */
const getDefaultImageForGender = (gender: "Male" | "Female" | "Other"): string => {
  switch (gender) {
    case "Male":
      return "https://randomuser.me/api/portraits/men/1.jpg";
    case "Female":
      return "https://randomuser.me/api/portraits/women/1.jpg";
    case "Other":
      return "https://randomuser.me/api/portraits/lego/1.jpg";
  }
};

/**
 * Prefetch and cache gender-specific profile images
 * Call this on app initialization to have images ready
 */
export const prefetchProfileImages = async (): Promise<void> => {
  try {
    await Promise.all([
      getProfileImageByGender("Male"),
      getProfileImageByGender("Female"),
      getProfileImageByGender("Other"),
    ]);
  } catch (error) {
    console.error('Error prefetching profile images:', error);
  }
};

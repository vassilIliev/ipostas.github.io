// Utility to resolve image paths with the correct base URL
export const getImageUrl = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Always use root path since we now have a custom domain
  return `/${cleanPath}`;
};

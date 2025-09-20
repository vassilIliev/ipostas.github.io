// Utility to resolve image paths with the correct base URL for GitHub Pages
export const getImageUrl = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In development, use the path as-is with leading slash
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, prepend the base URL for GitHub Pages
  return `/ipostas.github.io/${cleanPath}`;
};

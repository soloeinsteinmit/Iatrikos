const imageCache = new Map<string, string>();

export const useImageCache = () => {
  const preloadImage = async (url: string): Promise<void> => {
    if (imageCache.has(url)) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(url, objectUrl);
    } catch (error) {
      console.error("Failed to cache image:", error);
    }
  };

  const getCachedImage = (url: string): string => {
    return imageCache.get(url) || url;
  };

  return { preloadImage, getCachedImage };
};

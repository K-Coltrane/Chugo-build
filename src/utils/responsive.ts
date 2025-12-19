import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design dimensions (iPhone X/11/12 - 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scales a size based on screen width
 * @param size - The size to scale
 * @returns Scaled size
 */
export const scaleWidth = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
};

/**
 * Scales a size based on screen height
 * @param size - The size to scale
 * @returns Scaled size
 */
export const scaleHeight = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scale);
};

/**
 * Scales a font size based on screen width (more consistent for text)
 * @param size - The font size to scale
 * @returns Scaled font size
 */
export const scaleFont = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Scales a size based on the smaller dimension (for maintaining aspect ratio)
 * @param size - The size to scale
 * @returns Scaled size
 */
export const scaleSize = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  return Math.round(size * scale);
};

/**
 * Get responsive width percentage
 * @param percentage - Percentage of screen width (0-100)
 * @returns Width in pixels
 */
export const widthPercentage = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Get responsive height percentage
 * @param percentage - Percentage of screen height (0-100)
 * @returns Height in pixels
 */
export const heightPercentage = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Export screen dimensions for convenience
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;


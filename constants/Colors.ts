// Sunpeak Coffee color palette based on original web design
export const Colors = {
  // Primary colors
  primary: '#f9f506',
  primaryDark: '#dacc05',
  primaryLight: 'rgba(249, 245, 6, 0.3)',

  // Background colors
  backgroundLight: '#f8f8f5',
  backgroundDark: '#23220f',
  rewardsBg: '#FFFDF7',

  // Surface colors
  surfaceLight: '#ffffff',
  surfaceDark: '#2f2e16',

  // Text colors
  textMain: '#181811',
  textSecondary: '#8c8b5f',

  // Brown palette (for rewards screen)
  brownDark: '#3E2723',
  brownMedium: '#5D4037',

  // Accent colors
  orange: '#E65100',
  orangeLight: '#FF8F00',
  orangeBg: 'rgba(230, 81, 0, 0.1)',

  // Card and border colors
  cardBorder: '#EBE5DA',
  cardBorderLight: 'rgba(235, 229, 218, 0.3)',

  // Neutral colors
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',

  // Utility colors
  red500: '#EF4444',
  blue50: '#EFF6FF',
  blue600: '#2563EB',
  yellow50: '#FFFBEB',
  yellow500: '#F59E0B',
  yellow600: '#D97706',

  // Transparent
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Theme configuration for light/dark mode (currently only light mode is used)
export default {
  light: {
    text: Colors.textMain,
    background: Colors.backgroundLight,
    tint: Colors.primary,
    tabIconDefault: Colors.gray400,
    tabIconSelected: Colors.textMain,
  },
  dark: {
    text: '#fff',
    background: Colors.backgroundDark,
    tint: Colors.primary,
    tabIconDefault: Colors.gray400,
    tabIconSelected: Colors.primary,
  },
};

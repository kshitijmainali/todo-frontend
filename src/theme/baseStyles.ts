import { ThemeConfig } from '@chakra-ui/react';

export const baseStyles = {
  colors: {
    btn: '#FFD803',
    text: '#3B361C',
    white: '#ffffff',
    black: '#000000',
    whiteSecondary: '#fffffe',
    milk: '#fffef7',
    gray: '#bcbcbc',
    busYellow: '#ffd803',
    red: '#ff0303',
  },
  fonts: {
    heading: `Poppins, sans-serif`,
    body: `Poppins, sans-serif`,
  },
  fontSizes: {
    11: '0.6875rem',
    15: '0.9375px',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  } as ThemeConfig,

  sizes: {
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
  },
};

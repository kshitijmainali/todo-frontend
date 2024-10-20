import { extendTheme } from '@chakra-ui/react';
import { baseStyles } from './baseStyles';

// const theme = extendTheme({ colors, fontSizes, config, sizes });
const theme = extendTheme(baseStyles);
export default theme;

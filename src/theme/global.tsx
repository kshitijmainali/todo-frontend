import { Global } from '@emotion/react';
import PoppinsRegular from './../assets/fonts/Poppins-Regular.ttf';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: url(${PoppinsRegular}) format("truetype");
  }
  `}
  />
);

export default Fonts;

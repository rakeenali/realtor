import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  black: '#080705',
  grey: '#40434E',
  maroon: '#702632',
  lightBlack: '#080705bf',
  red: '#912F40',
  white: '#FFFFFA',
  navbarHeigth: '65px',
  normalTransition: 'all 0.15s ease-in',
};

const Theme: React.FC = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;

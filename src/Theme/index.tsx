//all theme color goes here

import {DefaultTheme} from '@react-navigation/native';

/**
 * Color cofiguration
 * ```typescript
 * const CustomTheme = {
 * ...DefaultTheme,
 * colors:{ //overide default colors here
 * primary?:"color value",
 * background?:"color value",
 * card?:"color value",
 * text?:"color value",
 * border?:"color value",
 * notification?:"color value"
 * }
 *
 * }
 * ```
 */

export const CustomTheme = {
  dark: true,
  colors: {
    primary: '#302832',
    background: '#413B43',
    card: '#48404A',
    text: '#E5E5E5',
    border: '#48404A',
    notification: '#DA5E05',
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(255,255,255,1)',
    background: '#E9E9E9',
    card: '#fff',
    text: '#000',
    border: '#D4D3D3',
    notification: '#DA5E05',
  },
};

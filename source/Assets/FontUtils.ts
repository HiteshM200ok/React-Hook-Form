import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export type FontSizeType = 'xxs' | 'xs' | 's' | 'xm' | 'm' | 'l' | 'xl' | 'xxl';

export type TFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export type FontFamilyType =
  | 'Black'
  | 'BlackItalic'
  | 'Bold'
  | 'BoldItalic'
  | 'Italic'
  | 'Light'
  | 'LightItalic'
  | 'Medium'
  | 'MediumItalic'
  | 'Regular'
  | 'Thin'
  | 'ThinItalic';

export const FontFamily = {
  Black: {id: 'Black', name: 'Roboto-Black'},
  BlackItalic: {id: 'BlackItalic', name: 'Roboto-BlackItalic'},
  Bold: {id: 'Bold', name: 'Roboto-Bold'},
  BoldItalic: {id: 'BoldItalic', name: 'Roboto-BoldItalic'},
  Italic: {id: 'Italic', name: 'Roboto-Italic'},
  Light: {id: 'Light', name: 'Roboto-Light'},
  LightItalic: {id: 'LightItalic', name: 'Roboto-LightItalic'},
  Medium: {id: 'Medium', name: 'Roboto-Medium'},
  MediumItalic: {id: 'MediumItalic', name: 'Roboto-MediumItalic'},
  Regular: {id: 'Regular', name: 'Roboto-Regular'},
  Thin: {id: 'Thin', name: 'Roboto-Thin'},
  ThinItalic: {id: 'ThinItalic', name: 'Roboto-ThinItalic'},
};

export const GetFontFamily = (fontFamilyId: FontFamilyType): string => {
  switch (fontFamilyId) {
    case FontFamily.Black.id:
      return FontFamily.Black.name;
    case FontFamily.BlackItalic.id:
      return FontFamily.BlackItalic.name;
    case FontFamily.Bold.id:
      return FontFamily.Bold.name;
    case FontFamily.BoldItalic.id:
      return FontFamily.BoldItalic.name;
    case FontFamily.Italic.id:
      return FontFamily.Italic.name;
    case FontFamily.Light.id:
      return FontFamily.Light.name;
    case FontFamily.LightItalic.id:
      return FontFamily.LightItalic.name;
    case FontFamily.Medium.id:
      return FontFamily.Medium.name;
    case FontFamily.MediumItalic.id:
      return FontFamily.MediumItalic.name;
    case FontFamily.Regular.id:
      return FontFamily.Regular.name;
    case FontFamily.Thin.id:
      return FontFamily.Thin.name;
    case FontFamily.ThinItalic.id:
      return FontFamily.ThinItalic.name;
    default:
      return FontFamily.Regular.name;
  }
};

export const GetFontSize = (fontSizeType: FontSizeType): number => {
  let fontSize = 12;
  switch (fontSizeType) {
    case 'xxs':
      fontSize = 8;
      break;
    case 'xs':
      fontSize = 10;
      break;
    case 's':
      fontSize = 12;
      break;
    case 'xm':
      fontSize = 13;
      break;
    case 'm':
      fontSize = 14;
      break;
    case 'l':
      fontSize = 16;
      break;
    case 'xl':
      fontSize = 18;
      break;
    case 'xxl':
      fontSize = 24;
      break;
    default:
      fontSize = 12;
      break;
  }
  return Normalize(fontSize);
};

export const GetLineHeight = (fontSizeType: FontSizeType): number => {
  let lineHeight = 18;
  switch (fontSizeType) {
    case 'xxs':
      lineHeight = 14;
      break;
    case 'xs':
      lineHeight = 16;
      break;
    case 's':
      lineHeight = 18;
      break;
    case 'xm':
      lineHeight = 19;
      break;
    case 'm':
      lineHeight = 20;
      break;
    case 'l':
      lineHeight = 22;
      break;
    case 'xl':
      lineHeight = 24;
      break;
    case 'xxl':
      lineHeight = 30;
      break;
    default:
      lineHeight = 18;
      break;
  }
  return Normalize(lineHeight);
};

// based on iphone 5s's scale
export const Normalize = (fontSize: number) => {
  const newSize = (fontSize * SCREEN_WIDTH) / 375;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

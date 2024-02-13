import React from 'react';
import {Text as RNText} from 'react-native';

import {
  Colors,
  GetFontFamily,
  GetLineHeight,
  GetFontSize,
  FontFamilyType,
  FontSizeType,
} from '@assets-root';
import {ColorValue, TextProps, TextStyle} from 'react-native';

type TFontWeight =
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

type TTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;

type TTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

interface IPropsText extends TextProps {
  color?: ColorValue;
  fontFamily?: FontFamilyType;
  fontSize?: FontSizeType;
  textTransform?: TTextTransform;
  fontWeight?: TFontWeight;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: TTextAlign;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  flex?: number;
  style?: TextStyle;
}

const TextComponent = ({
  children,
  color = Colors.Black1,
  fontFamily = 'Black',
  fontSize = 'm',
  fontWeight = 'normal',
  letterSpacing = 0.5,
  textAlign = 'left',
  style,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  textTransform = 'none',
  flex,
  ...restProps
}: IPropsText): JSX.Element => {
  const textStyle = {
    color,
    fontFamily: GetFontFamily(fontFamily),
    fontSize: GetFontSize(fontSize),
    fontWeight,
    letterSpacing: letterSpacing,
    lineHeight: GetLineHeight(fontSize),
    textAlign,
    textTransform,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    flex,
    ...style,
  };
  return (
    <RNText {...restProps} style={textStyle} allowFontScaling={false}>
      {children}
    </RNText>
  );
};

const Text = React.memo(TextComponent);
export {Text};
export type {IPropsText};

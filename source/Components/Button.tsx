import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ReactNode} from 'react';
import {
  TouchableOpacityProps,
  ActivityIndicatorProps,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';
import {FontFamilyType, FontSizeType, Colors} from '@assets-root';
import {IPropsText, Text} from '@components/Text';

interface IPropsButton extends TouchableOpacityProps {
  title?: string;
  titleStyle?: TextStyle | undefined;
  titleProps?: IPropsText;
  isLoading?: boolean;
  loadingProps?: ActivityIndicatorProps;
  disabled?: boolean;
  style?: ViewStyle | undefined;
  backgroundColor?: ColorValue;
  isBgTransparent?: boolean;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  leftItem?: ReactNode | null;
  minWidth?: DimensionValue | undefined;
  flex?: number | undefined;
  rightItem?: ReactNode | undefined | null;
  isBorder?: boolean;
  borderColor?: ColorValue;
  titleColor?: ColorValue;
  minHeight?: DimensionValue | undefined;
  fontFamily?: FontFamilyType;
  fontSize?: FontSizeType;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  fontWeight?:
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
  isShadow?: boolean;
  margin?: number;

  // paddings
  pad_hrztl?: number;
  pad_vrtl?: number;
  pad?: number;
  pad_lt?: number;
  pad_rt?: number;
  pad_tp?: number;
  pad_bm?: number;

  // border-radius
  bord_rads?: number;
  bord_tp_lt_rads?: number;
  bord_tp_rt_rads?: number;
  bord_bm_lf_rads?: number;
  bord_bm_rt_rads?: number;
}

const Button = ({
  title = 'TITLE',
  titleStyle,
  titleProps,
  isLoading,
  loadingProps,
  disabled = false,
  style,
  backgroundColor = Colors.Primary,
  isBgTransparent = false,
  alignSelf = 'auto',
  leftItem = null,
  rightItem = null,
  minWidth = '65%',
  flex,
  isBorder = false,
  borderColor = Colors.Primary,
  titleColor = Colors.White,
  minHeight = 44,
  fontSize = 'l',
  fontFamily = 'Bold',
  fontWeight = '700',
  isShadow = false,
  // margin
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  // paddings
  pad,
  pad_hrztl = 15,
  pad_vrtl,
  pad_lt,
  pad_rt,
  pad_tp,
  pad_bm,
  // border-radius
  bord_rads = 5,
  bord_tp_lt_rads,
  bord_tp_rt_rads,
  bord_bm_lf_rads,
  bord_bm_rt_rads,
  ...restProps
}: IPropsButton): JSX.Element => {
  const buttonStyle: ViewStyle = useMemo(() => {
    return {
      ...styles.button,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      alignSelf,
      backgroundColor,
      ...(isBgTransparent && {backgroundColor: 'transparent'}),
      ...(disabled && {backgroundColor: Colors.LightBlue}),
      ...(!flex && minWidth && {minWidth}),
      ...(minHeight && {minHeight}),
      ...(isBorder && {
        borderWidth: 1.35,
        borderColor,
      }),
      flex,
      ...(isShadow &&
        !isBgTransparent && {
          shadowColor: Colors.Black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }),
      // padding
      padding: pad,
      paddingHorizontal: pad_hrztl,
      paddingVertical: pad_vrtl,
      paddingLeft: pad_lt,
      paddingRight: pad_rt,
      paddingTop: pad_tp,
      paddingBottom: pad_bm,

      //border-radius
      borderRadius: bord_rads,
      borderTopLeftRadius: bord_tp_lt_rads,
      borderTopRightRadius: bord_tp_rt_rads,
      borderBottomLeftRadius: bord_bm_lf_rads,
      borderBottomRightRadius: bord_bm_rt_rads,
      ...style,
    };
  }, [
    isShadow,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    backgroundColor,
    alignSelf,
    isBgTransparent,
    disabled,
    flex,
    minWidth,
    style,
    isBorder,
    borderColor,
    minHeight,
    margin,
    //padding
    pad,
    pad_hrztl,
    pad_vrtl,
    pad_lt,
    pad_rt,
    pad_tp,
    pad_bm,
    // border-radius
    bord_rads,
    bord_tp_lt_rads,
    bord_tp_rt_rads,
    bord_bm_lf_rads,
    bord_bm_rt_rads,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      {...restProps}
      style={buttonStyle}>
      {leftItem}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.White}
          {...loadingProps}
        />
      ) : (
        <Text
          color={titleColor}
          textAlign="center"
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          style={titleStyle}
          {...titleProps}>
          {title}
        </Text>
      )}
      {rightItem}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export {Button};

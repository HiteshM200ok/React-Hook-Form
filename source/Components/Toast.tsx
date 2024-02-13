/* eslint-disable prettier/prettier */
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNToast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import { StyleSheet } from 'react-native';
import {Colors, FontFamily, GetFontSize,GetLineHeight} from '@assets-root';
/*
  1. Create the config
*/
const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successStyle}
      contentContainerStyle={styles.generalContentContainer}
      text1Style={styles.successText1}
      text2Style={styles.successText2}
      text1Props={{numberOfLines: 3}}
      text2Props={{numberOfLines: 20}}
    />
  ),
  /*
      Overwrite 'info' type,
      by modifying the existing `BaseToast` component
    */
  info: (props: any) => (
    <BaseToast
      {...props}
      style={styles.infoStyle}
      contentContainerStyle={styles.generalContentContainer}
      text1Style={styles.infoText1}
      text2Style={styles.infoText2}
      text1Props={{numberOfLines: 3}}
      text2Props={{numberOfLines: 20}}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorStyle}
      contentContainerStyle={styles.generalContentContainer}
      text1Style={styles.errorText1}
      text2Style={styles.errorText2}
      text1Props={{numberOfLines: 3}}
      text2Props={{numberOfLines: 20}}
    />
  ),
};

const Toast = () => {
  const {top: topInset} = useSafeAreaInsets();
  return <RNToast config={toastConfig} topOffset={topInset + 22} />;
};

const text2Color = Colors.Black;
const generalStyle = {
  height: undefined,
  paddingVertical: 8,
  borderLeftWidth: 5,
};

const styles = StyleSheet.create({
  generalContentContainer: {
    paddingHorizontal: 15,
    minHeight: 35,
  },
  // success
  successStyle: {
    ...generalStyle,
    borderLeftColor: Colors.Success,
  },
  successText1: {
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Bold.name,
    lineHeight: GetLineHeight('m'),
    fontWeight: '700',
  },
  successText2: {
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Regular.name,
    lineHeight: GetLineHeight('m'),
    color: text2Color,
  },

  // info
  infoStyle: {
    ...generalStyle,
    borderLeftColor: Colors.Primary,
  },
  infoText1: {
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Bold.name,
    lineHeight: GetLineHeight('m'),
    fontWeight: '700',
  },
  infoText2: {
    color: text2Color,
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Regular.name,
    lineHeight: GetLineHeight('m'),
  },

  //error
  errorStyle: {
    ...generalStyle,
    borderLeftColor: Colors.Danger,
  },
  errorText1: {
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Bold.name,
    lineHeight: GetLineHeight('m'),
    fontWeight: '700',
  },
  errorText2: {
    color: text2Color,
    fontSize: GetFontSize('m'),
    fontFamily: FontFamily.Regular.name,
    lineHeight: GetLineHeight('m'),
  },
});

export {Toast};


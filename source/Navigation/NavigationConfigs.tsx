import React from 'react';
import {StyleSheet} from 'react-native';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, FontFamily, GetFontSize} from '@assets-root';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Primary,
  },
  headerTitle: {
    fontFamily: FontFamily.Bold.name,
    color: Colors.White,
    fontSize: GetFontSize('l'),
    fontWeight: '700',
  },
  headerBackLabel: {
    fontFamily: FontFamily.Regular.name,
    color: Colors.White,
    fontSize: GetFontSize('l'),
    fontWeight: '600',
  },
  headerBackButton: {
    marginLeft: -7.5,
  },
});

/**
 * hide header options
 */
export const hideHeaderScreenOptions: {headerShown: boolean} = {
  headerShown: false,
};

/**
 * screen options
 */
export const ScreenOptions: NativeStackNavigationOptions = {
  headerStyle: styles.header,
  headerTitleAlign: 'center',
  headerTitleStyle: styles.headerTitle,
  animation: 'slide_from_right',
  title: '',
};

const HeaderBackButtonImage = ({tintColor}: HeaderBackButtonProps) => {
  return <Ionicons name="arrow-back-outline" size={26} color={tintColor} />;
};

const onPressBack = (props: NativeStackHeaderProps) => {
  props?.navigation?.goBack();
};

/**
 * sub screen options
 */
export const SubScreenOptions: any = (
  props: NativeStackHeaderProps,
): NativeStackNavigationOptions => {
  return {
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => onPressBack(props)}
        label="Back"
        labelVisible={false}
        canGoBack={true}
        tintColor={Colors.White}
        labelStyle={styles.headerBackLabel}
        backImage={HeaderBackButtonImage}
        style={styles.headerBackButton}
      />
    ),
    ...props,
  };
};

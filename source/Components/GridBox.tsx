import React, {ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@assets-root';
import {Text} from '@components/Text';

interface IPropsGridBox extends TouchableOpacityProps {
  label: string;
  icon?: ReactNode;
  containerStyles?: ViewStyle;
}

const GridBox: React.FC<IPropsGridBox> = ({
  label = '',
  icon = null,
  containerStyles,
  style,
  ...restProps
}) => {
  return (
    <View style={[styles.box, containerStyles]}>
      <TouchableOpacity
        style={[styles.innerBox, style]}
        activeOpacity={0.7}
        {...restProps}>
        {icon ? icon : null}
        <Text
          color={Colors.Primary}
          fontSize="l"
          fontWeight="600"
          marginTop={10}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: '50%',
    padding: 7.5,
    backgroundColor: 'transparent',
  },
  innerBox: {
    backgroundColor: Colors.Gray2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
});

export {GridBox};

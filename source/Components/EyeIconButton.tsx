import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Colors} from '@assets-root';
import Icon from 'react-native-vector-icons/Ionicons';

interface IPropsEyeIconButton extends TouchableOpacityProps {
  isEyeOpen: boolean;
  iconSize?: number;
}

const EyeIconButton = ({
  isEyeOpen,
  iconSize = 22,
  ...restProps
}: IPropsEyeIconButton): JSX.Element => {
  return (
    <TouchableOpacity {...restProps}>
      {isEyeOpen ? (
        <Icon name="eye-off-outline" size={iconSize} color={Colors.Black49} />
      ) : (
        <Icon name="eye-outline" size={iconSize} color={Colors.Black49} />
      )}
    </TouchableOpacity>
  );
};

export {EyeIconButton};

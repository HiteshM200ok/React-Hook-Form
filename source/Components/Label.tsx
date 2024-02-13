import React from 'react';
import {Colors} from '@assets-root';
import {IPropsText, Text} from '@components/Text';

interface IPropsHeading extends IPropsText {}

const Label: React.FC<IPropsHeading> = ({
  fontSize = 'm',
  fontFamily = 'Regular',
  color = Colors.Primary,
  fontWeight = '600',
  ...restProps
}) => {
  return (
    <Text
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      color={color}
      {...restProps}
    />
  );
};

export {Label};

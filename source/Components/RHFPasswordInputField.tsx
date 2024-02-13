import React, {useCallback, useState} from 'react';
import {IPropsRHFInputField, RHFInputField} from './RHFInputField';
import {EyeIconButton} from './EyeIconButton';

interface IPropsRHFPasswordInputField extends IPropsRHFInputField {}

const RHFPasswordInputField: React.FC<IPropsRHFPasswordInputField> = ({
  ...props
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const onPressEyeButton = useCallback(() => {
    setIsSecureTextEntry(prevState => !prevState);
  }, []);

  const renderRightItemComponent = useCallback(() => {
    return (
      <EyeIconButton isEyeOpen={isSecureTextEntry} onPress={onPressEyeButton} />
    );
  }, [isSecureTextEntry, onPressEyeButton]);

  return (
    <RHFInputField
      renderRightItem={renderRightItemComponent}
      secureTextEntry={isSecureTextEntry}
      {...props}
    />
  );
};

export {RHFPasswordInputField};

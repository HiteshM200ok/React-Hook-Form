import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '@assets-root';
import {FieldError} from 'react-hook-form';
import {Text} from '@components/Text';

interface IPropsRHFError {
  error: FieldError | undefined;
  invalid?: boolean;
  isDirty?: boolean;
  isTouched?: boolean;
}

export const RHFErrorComponent: React.FC<IPropsRHFError> = ({error}) => {
  if (!error || !error.message) {
    return null;
  }
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <>
        <MaterialIcons name="error-outline" size={20} color={Colors.Danger} />
        <Text
          marginLeft={5}
          color={Colors.Danger}
          fontWeight="600"
          fontSize="m">
          {error.message}
        </Text>
      </>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
  },
});

const RHFError = React.memo(RHFErrorComponent);
export {RHFError};

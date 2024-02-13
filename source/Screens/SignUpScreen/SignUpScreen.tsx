import React, {useMemo} from 'react';
import {useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Button, RHFInputField, RHFPasswordInputField} from '@components-root';
import {useSignUpScreen} from './SignUpScreenHook';
import {Colors} from '@assets-root';
import {Container, Text} from '@components-root';
import {Edges} from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const {
    bottomInset,
    topInset,
    control,
    handleSubmit,
    onValidateSignUp,
    onSignIn,
  } = useSignUpScreen();

  const wrapperStyle: ViewStyle = useMemo(
    () => ({
      paddingTop: topInset,
      paddingBottom: bottomInset,
      flex: 1,
      backgroundColor: Colors.White,
    }),
    [bottomInset, topInset],
  );

  const removeEdges: Edges = useMemo(() => {
    return ['bottom'];
  }, []);

  const renderDescription = useCallback(() => {
    return (
      <View style={styles.descriptionContainer}>
        <Text
          color={Colors.Black1}
          fontSize="xxl"
          fontWeight="bold"
          textAlign="center">
          {'Welcome!\nYou can create an account here.'}
        </Text>
        <Text
          textAlign="center"
          color={Colors.Gray}
          fontSize="l"
          marginTop={20}>
          By signing up, you will gain access to exclusive content, special
          offers, and be the first to hear about exciting news and updates.
        </Text>
      </View>
    );
  }, []);

  const renderSignUpForm = useCallback(() => {
    return (
      <View style={styles.form}>
        <RHFInputField
          name="email"
          placeholder="Email"
          control={control}
          label="Email"
          isVisibleMandatorySymbol={false}
        />
        <RHFPasswordInputField
          control={control}
          name="password"
          placeholder="Password"
          label="Password"
          isVisibleMandatorySymbol={false}
        />
        <RHFPasswordInputField
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          label="Confirm Password"
          isVisibleMandatorySymbol={false}
        />
        <Button
          title="Sign Up"
          titleColor="white"
          marginTop={25}
          onPress={handleSubmit(onValidateSignUp)}
        />
      </View>
    );
  }, [control, onValidateSignUp, handleSubmit]);

  const renderFooter = useCallback(() => {
    return (
      <TouchableOpacity onPress={onSignIn} style={styles.footer}>
        <Text>Already have an account? </Text>
        <Text fontWeight="bold">Sign In</Text>
      </TouchableOpacity>
    );
  }, [onSignIn]);

  return (
    <View style={wrapperStyle}>
      <Container
        removeEdges={removeEdges}
        containerType="KeyboardAwareScrollView"
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.White}
          animated={true}
        />
        {renderDescription()}
        {renderSignUpForm()}
      </Container>
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  form: {
    marginTop: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.White,
  },
});

export default SignUpScreen;

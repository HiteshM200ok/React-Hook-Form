import React, {useMemo} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLoginScreen} from './LoginScreenHook';
import {
  Button,
  Text,
  RHFInputField,
  RHFPasswordInputField,
} from '@components-root';
import {Colors} from '@assets-root';
import {Container} from '@components-root';
import {Edges} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const {
    bottomInset,
    topInset,
    control,
    onValidateLogin,
    handleSubmit,
    onSignUp,
  } = useLoginScreen();

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
          {'Welcome back!\nPlease Sign in to continue.'}
        </Text>
        <Text
          textAlign="center"
          color={Colors.Gray}
          fontSize="l"
          marginTop={20}>
          By signing in, you will gain access to exclusive content, special
          offers, and be the first to hear about exciting news and updates.
        </Text>
      </View>
    );
  }, []);

  const renderSocialNetworkContainer = useCallback(() => {
    return (
      <View style={styles.socialNetworkSignContainer}>
        <Button
          leftItem={
            <Icon
              name="logo-apple"
              color={Colors.White}
              size={25}
              style={styles.icon}
            />
          }
          title="Signin with Apple"
          isBorder={true}
          backgroundColor={Colors.Black}
          titleColor={Colors.White}
        />
        <Button
          leftItem={
            <Icon
              name="logo-google"
              color="black"
              size={22}
              style={styles.icon}
            />
          }
          title="Signin with Google"
          titleColor={Colors.Gray3}
          isBorder={true}
          marginTop={15}
          backgroundColor={Colors.White}
        />
      </View>
    );
  }, []);

  const renderOrSeparator = useCallback(() => {
    return (
      <View style={styles.orSeparatorContainer}>
        <View style={styles.orSeparator} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orSeparator} />
      </View>
    );
  }, []);

  const renderLoginForm = useCallback(() => {
    return (
      <View style={styles.form}>
        <RHFInputField
          name="email"
          placeholder="Email"
          control={control}
          isMandatory={true}
          isEmail={true}
          label="Email"
          isVisibleMandatorySymbol={false}
        />
        <RHFPasswordInputField
          control={control}
          name="password"
          placeholder="Password"
          isMandatory={true}
          label="Password"
          isVisibleMandatorySymbol={false}
          containerMarginTop={30}
        />
        <Button
          title="Sign In"
          titleColor={Colors.White}
          onPress={handleSubmit(onValidateLogin)}
          marginTop={25}
        />
      </View>
    );
  }, [control, onValidateLogin, handleSubmit]);

  const renderForgotPassword = useCallback(() => {
    return (
      <TouchableOpacity style={styles.forgotPassword}>
        <Text
          fontWeight="bold"
          color={Colors.Primary}
          style={styles.forgotPasswordText}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    );
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <TouchableOpacity onPress={onSignUp} style={styles.footer}>
        <Text>Don't have an account? </Text>
        <Text fontWeight="bold">Sign Up</Text>
      </TouchableOpacity>
    );
  }, [onSignUp]);

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
        {renderSocialNetworkContainer()}
        {renderOrSeparator()}
        {renderLoginForm()}
        {renderForgotPassword()}
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
  socialNetworkSignContainer: {
    marginVertical: 25,
  },
  orSeparatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  orText: {
    marginHorizontal: 10,
  },
  orSeparator: {
    height: 1,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: Colors.Ghost,
  },
  form: {
    marginTop: 10,
  },
  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    alignSelf: 'center',
    marginBottom: 15,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.White,
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;

import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Routes from '@navigation-route';
import {TAuthNavigationParamList} from './AuthNavigation.d';
import {ParamListBase} from '@react-navigation/native';
import {hideHeaderScreenOptions} from '@navigation/NavigationConfigs';

// screens
import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';

type Props = NativeStackScreenProps<ParamListBase>;
const Stack = createNativeStackNavigator<TAuthNavigationParamList>();
const AuthNavigation = ({}: Props) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={hideHeaderScreenOptions}>
      <Stack.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{animation: 'none'}}
      />
      <Stack.Screen
        name={Routes.SignUp}
        component={SignUpScreen}
        options={{animation: 'none'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

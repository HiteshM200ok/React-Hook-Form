import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Routes from '@navigation-route';
import {TDashboardNavigationParamList} from './DashboardNavigation.d';
import {ParamListBase} from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import {ScreenOptions} from '@navigation/NavigationConfigs';

// screens

type Props = NativeStackScreenProps<ParamListBase>;
const Stack = createNativeStackNavigator<TDashboardNavigationParamList>();
const DashboardNavigation = ({}: Props) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={ScreenOptions}>
      <Stack.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{animation: 'none'}}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;

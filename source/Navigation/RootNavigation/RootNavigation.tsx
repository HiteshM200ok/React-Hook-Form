import React from 'react';
import {TRootNavigationParamList} from './RootNavigation.d';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from '@navigation-route';

// Navigations & Screen
import AppEntryPointScreen from '@screens/AppEntryPointScreen/AppEntryPointScreen';
import AuthNavigation from '@navigation/AuthNavigation/AuthNavigation';
import DashboardNavigation from '@navigation/DashboardNavigation/DashboardNavigation';

const Stack = createNativeStackNavigator<TRootNavigationParamList>();
const RootNavigation: React.FC<any> = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.AppEntryPoint}
        component={AppEntryPointScreen}
      />
      <Stack.Screen
        name={Routes.AuthNavigation}
        component={AuthNavigation}
        options={{animation: 'none'}}
      />
      <Stack.Screen
        name={Routes.DashboardNavigation}
        component={DashboardNavigation}
        options={{animation: 'none'}}
      />
    </Stack.Navigator>
  );
};
export default RootNavigation;

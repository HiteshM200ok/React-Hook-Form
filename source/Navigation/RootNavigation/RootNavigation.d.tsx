import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import Routes from '@navigation-route';
import {TAuthNavigationParamList} from '@navigation/AuthNavigation/AuthNavigation.d';
import {TDashboardNavigationParamList} from '@navigation/DashboardNavigation/DashboardNavigation.d';

/**
 * Root Navigation ParamList
 */
export declare type TRootNavigationParamList = {
  [Routes.AppEntryPoint]: undefined;
  [Routes.AuthNavigation]: NativeStackNavigationProp<TAuthNavigationParamList>;
  [Routes.DashboardNavigation]: NavigatorScreenParams<TDashboardNavigationParamList>;
};

export type RootNavigationProps<T extends keyof TRootNavigationParamList> =
  NativeStackScreenProps<TRootNavigationParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootNavigationParamList {}
  }
}

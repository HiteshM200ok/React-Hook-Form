import Routes from '@navigation-route';

/**
 * Auth Navigation Screens Route Params
 */
export interface ILoginRouteParams {}

export interface ISignUpRouteParams {}

export declare type TAuthNavigationParamList = {
  [Routes.Login]: ILoginRouteParams;
  [Routes.SignUp]: ISignUpRouteParams;
};

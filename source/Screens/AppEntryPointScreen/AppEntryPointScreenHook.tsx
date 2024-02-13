import {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGoBackNavigation} from '@hooks-root';
import Routes from '@navigation-route';
import {IStoreState} from '@redux-store';

export const useNavigationEntryPointScreen = () => {
  const {navigation} = useGoBackNavigation();
  const {token} = useSelector((state: IStoreState) => state.LoginReducer);

  useEffect(() => {
    if (token) {
      navigation.dispatch(
        CommonActions.reset({routes: [{name: Routes.DashboardNavigation}]}),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({routes: [{name: Routes.AuthNavigation}]}),
      );
    }
  }, [navigation, token]);

  return null;
};

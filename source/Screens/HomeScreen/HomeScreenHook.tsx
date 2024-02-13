import {useCallback} from 'react';
import {Alert} from 'react-native';
import {useGoBackNavigation} from '@hooks-root';
import {CommonActions} from '@react-navigation/native';
import Routes from '@navigation-route';
import {useDispatch} from 'react-redux';

export const useHomeScreen = () => {
  const {navigation} = useGoBackNavigation();
  const dispatch = useDispatch();

  const resetAppState = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{name: Routes.AuthNavigation}],
      }),
    );
    dispatch({type: '#RESET'});
  }, [navigation, dispatch]);

  const onLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'No', onPress: () => {}},
      {
        text: 'Yes',
        onPress: resetAppState,
      },
    ]);
  }, [resetAppState]);

  return {
    onLogout,
    navigation,
  };
};

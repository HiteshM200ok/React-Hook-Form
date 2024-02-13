import {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CommonActions, StackActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Routes from '@navigation-route';
import {useGoBackNavigation} from '@hooks-root';
import {saveTokenAction} from '@reducers/LoginReducer';
import {useLoadingModalContext} from '@components-root';
import {Api, ApiErrorMessage, validateApiResponse} from '@network-root';
import {TLoginScreen} from './LoginScreen.d';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useLoginScreen = () => {
  const {bottom: bottomInset, top: topInset} = useSafeAreaInsets();

  const loadingModal = useLoadingModalContext();
  const {navigation} = useGoBackNavigation();
  const dispatch = useDispatch();

  const {control, handleSubmit} = useForm({
    defaultValues: {email: '', password: ''},
    mode: 'onChange',
  });

  const onSignUp = useCallback(() => {
    navigation.dispatch(StackActions.replace(Routes.SignUp));
  }, [navigation]);

  const onValidateLogin: SubmitHandler<TLoginScreen> = useCallback(
    async payload => {
      loadingModal.show();
      try {
        const response = await Api.post('login', payload);

        const {isValid, responseData} = validateApiResponse({
          response,
          dataType: 'object',
          innerDataValidateRules: {token: 'string'},
          isSuccessToast: true,
        });
        if (!isValid) {
          return;
        }

        dispatch(saveTokenAction(responseData));
        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: Routes.DashboardNavigation}],
          }),
        );
      } catch (error) {
        ApiErrorMessage(error);
      } finally {
        loadingModal.hide();
      }
    },
    [navigation, loadingModal, dispatch],
  );

  return {
    bottomInset,
    topInset,
    control,
    handleSubmit,
    onValidateLogin,
    onSignUp,
  };
};

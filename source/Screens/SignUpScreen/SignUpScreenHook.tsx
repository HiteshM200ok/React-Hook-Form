import {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {CommonActions, StackActions} from '@react-navigation/native';
import Routes from '@navigation-route';
import {useLoadingModalContext} from '@components-root';
import {useGoBackNavigation} from '@hooks-root';
import {saveTokenAction} from '@reducers/LoginReducer';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignUpSchemaType, signUpSchema} from './SignUpscreen.d';
import {showSuccessToast} from '@utills';
import {Api, ApiErrorMessage, validateApiResponse} from '@network-root';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useSignUpScreen = () => {
  const {bottom: bottomInset, top: topInset} = useSafeAreaInsets();
  const loadingModal = useLoadingModalContext();
  const {navigation} = useGoBackNavigation();
  const dispatch = useDispatch();

  const {control, handleSubmit} = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSignIn = useCallback(() => {
    navigation.dispatch(StackActions.replace(Routes.Login));
  }, [navigation]);

  const onValidateSignUp: SubmitHandler<SignUpSchemaType> = useCallback(
    async values => {
      loadingModal.show();
      const payload = {email: values.email, password: values.password};
      try {
        const response = await Api.post('register', payload);
        const {isValid, responseData} = validateApiResponse({
          response,
          dataType: 'object',
          innerDataValidateRules: {id: 'has', token: 'string'},
          isSuccessToast: true,
        });
        if (!isValid) {
          return;
        }
        showSuccessToast({text2: 'Signed up successfully'});
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
    onValidateSignUp,
    onSignIn,
  };
};

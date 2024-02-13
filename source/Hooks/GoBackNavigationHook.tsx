import {useCallback, useEffect, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EventRegister} from 'react-native-event-listeners';
import {set} from 'lodash';

const emptyParams = {};

export const getGuid = () => {
  return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 || 0,
      v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

export const useGoBackNavigation = () => {
  const navigation = useNavigation();
  const goBackDataRef: any = useRef(null);
  const routeParams: any = useRoute().params ?? emptyParams;
  const {eventRegisterKey} = routeParams;

  const getParamsWithEventRegister = useCallback(
    (params = {}, eventRegisterValue = '') => {
      let newParams = {...params};
      let path = '';
      const getParams = (nested = {}) => {
        const {params: nestedParams}: any = nested;
        if (nestedParams) {
          if (path) {
            path = `${path}.params`;
          } else {
            path = 'params';
          }
          getParams(nestedParams);
        }
      };
      getParams(newParams);
      if (path) {
        path = `${path}.eventRegisterKey`;
      } else {
        path = 'eventRegisterKey';
      }
      set(newParams, path, eventRegisterValue);
      return newParams;
    },
    [],
  );

  const navigateWithCallback = useCallback(
    (
      routeName: string,
      params: any = {},
    ): Promise<{data: any; eventRegisterKey: string}> => {
      return new Promise(resolve => {
        const eventRegisterValue = getGuid();
        if (routeName && eventRegisterValue) {
          const listener: any = EventRegister.addEventListener(
            eventRegisterValue,
            (data: any) => {
              resolve({data, eventRegisterKey: eventRegisterValue});
              EventRegister.removeEventListener(listener);
            },
          );
          const paramsWithEventRegister = getParamsWithEventRegister(
            params,
            eventRegisterValue,
          );
          navigation.navigate(routeName, paramsWithEventRegister);
        } else {
          resolve({eventRegisterKey: eventRegisterValue, data: null});
        }
      });
    },
    [navigation, getParamsWithEventRegister],
  );

  const goBack = useCallback(
    (data?: any) => {
      goBackDataRef.current = data;
      navigation.goBack();
    },
    [navigation],
  );

  const setGoBackData = useCallback((data?: any) => {
    goBackDataRef.current = data;
  }, []);

  useEffect(() => {
    return () => {
      if (eventRegisterKey) {
        EventRegister.emit(eventRegisterKey, goBackDataRef.current);
      }
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {goBack, navigateWithCallback, navigation, routeParams, setGoBackData};
};

import {Ref, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {EventRegister} from 'react-native-event-listeners';

const listnerKey = '#LoaderKey';

export interface IPropsLoadingModal {}

export interface IHandleLoadingModal {
  show: () => void;
  hide: () => Promise<boolean>;
}

export const useLoadingModal = (ref: Ref<IHandleLoadingModal>) => {
  const listener = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    return new Promise(resolve => {
      listener.current = EventRegister.addEventListener(listnerKey, () => {
        resolve(true);
        EventRegister.removeEventListener(listener.current);
        listener.current = null;
      });
    });
  }, []);

  const onModalHide = useCallback(() => {
    EventRegister.emit(listnerKey);
    setIsVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return {isVisible, onModalHide};
};

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import LoadingModal from './LoadingModal';
import {IHandleLoadingModal} from './LoadingModalHook';

interface ILoadingModalContextValues {
  show: () => void;
  hide: () => Promise<any> | void;
}

const LoadingModalContext = createContext<ILoadingModalContextValues>({
  show: () => null,
  hide: () => {
    return new Promise(resolve => {
      resolve(true);
    });
  },
});

export const useLoadingModalContext = () => useContext(LoadingModalContext);

export const LoadingModalProvider: React.FC<any> = ({children}: any) => {
  const loadingModalRef = useRef<IHandleLoadingModal>(null);

  const show = useCallback(() => {
    return loadingModalRef?.current?.show();
  }, []);

  const hide = useCallback(() => {
    return loadingModalRef?.current?.hide();
  }, []);

  const value = useMemo(() => ({show, hide}), [show, hide]);

  return (
    <LoadingModalContext.Provider value={value}>
      {children}
      <LoadingModal ref={loadingModalRef} />
    </LoadingModalContext.Provider>
  );
};

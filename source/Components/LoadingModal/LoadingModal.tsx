import React, {forwardRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  IHandleLoadingModal,
  IPropsLoadingModal,
  useLoadingModal,
} from './LoadingModalHook';
import {Colors} from '@assets-root';
import {Text} from '@components/Text';

const LoadingModal = forwardRef<IHandleLoadingModal, IPropsLoadingModal>(
  (props, ref) => {
    const {isVisible, onModalHide} = useLoadingModal(ref);
    return (
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.8}
        backdropColor="black"
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onModalHide={onModalHide}
        useNativeDriverForBackdrop={true}
        coverScreen={true}
        useNativeDriver={true}>
        <View style={styles.container}>
          <ActivityIndicator color="black" size={'small'} />
          <Text
            marginLeft={15}
            fontSize="xl"
            color={Colors.Primary}
            letterSpacing={0.5}>
            Loading
          </Text>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default LoadingModal;

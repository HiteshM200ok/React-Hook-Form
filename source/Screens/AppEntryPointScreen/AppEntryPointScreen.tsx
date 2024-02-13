import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigationEntryPointScreen} from './AppEntryPointScreenHook';
import {Colors} from '@assets-root';

const AppEntryPointScreen: React.FC<any> = () => {
  useNavigationEntryPointScreen();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.Primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppEntryPointScreen;

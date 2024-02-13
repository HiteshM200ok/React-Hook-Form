import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '@assets-root';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useHomeScreen} from './HomeScreenHook';
import {Container, GridBox} from '@components-root';

const HomeScreen = () => {
  const {navigation, onLogout} = useHomeScreen();

  useLayoutEffect(() => {
    navigation.setOptions({title: 'Home'});
  }, [navigation]);

  return (
    <Container
      containerType="ScrollView"
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      {/* Features */}
      <View style={styles.featuresItemContainer}>
        <GridBox
          label="Need Help"
          icon={
            <AntDesignIcon
              name="customerservice"
              size={40}
              color={Colors.Primary}
            />
          }
        />
        <GridBox
          label="Settings"
          icon={
            <Ionicons
              name="settings-outline"
              size={40}
              color={Colors.Primary}
            />
          }
        />
        <GridBox
          label="Logout"
          icon={<MaterialIcon name="logout" size={40} color={Colors.Primary} />}
          onPress={onLogout}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  featuresItemContainer: {
    flex: 1,
    padding: 7.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  box: {
    height: 150,
    width: '50%',
    padding: 7.5,
  },
  innerBox: {
    backgroundColor: Colors.Gray2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
});

export default HomeScreen;

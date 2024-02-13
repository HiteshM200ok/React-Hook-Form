import React, {ReactNode, useMemo} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {Edge, Edges, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@assets-root';
import {isArray} from 'lodash';

interface IPropsContainer extends ViewProps, KeyboardAwareScrollViewProps {
  containerType?: 'View' | 'ScrollView' | 'KeyboardAwareScrollView';
  isLoading?: boolean;
  children: ReactNode;
  contentContainerStyle: ViewStyle;
  edges?: Edges;
  removeEdges?: Edges;
}

const Container: React.FC<IPropsContainer> = ({
  isLoading = false,
  containerType = 'View',
  style,
  children = null,
  contentContainerStyle,
  edges,
  removeEdges,
  ...restProps
}) => {
  let MainContainer = useMemo(() => {
    if (containerType === 'ScrollView') {
      return ScrollView;
    } else if (containerType === 'KeyboardAwareScrollView') {
      return KeyboardAwareScrollView;
    }
    return View;
  }, [containerType]);

  let ContentContainerProps: any = useMemo(() => {
    if (containerType !== 'View') {
      return {
        contentContainerStyle: {
          flexGrow: 1,
          backgroundColor: 'white',
          ...(isLoading && styles.loadingContainer),
          ...contentContainerStyle,
        },
        enableOnAndroid: true,
      };
    }

    return {};
  }, [containerType, contentContainerStyle, isLoading]);

  let mainStyle: ViewStyle = useMemo(() => {
    if (containerType === 'View') {
      return {
        ...(isLoading && styles.loadingContainer),
      };
    }

    return {};
  }, [containerType, isLoading]);

  const newEdges = useMemo(() => {
    let _newEdges: Array<Edge> = ['right', 'bottom', 'left'];
    if (isArray(edges)) {
      edges.forEach(edge => {
        const isEgdeExist = _newEdges.find(_edge => edge === _edge);
        if (!isEgdeExist) {
          _newEdges.push(edge);
        }
      });
    }
    if (isArray(removeEdges)) {
      removeEdges.forEach(edge => {
        const egdeIndex = _newEdges.findIndex(_edge => edge === _edge);
        if (egdeIndex > -1) {
          _newEdges = [
            ..._newEdges.slice(0, egdeIndex),
            ..._newEdges.slice(egdeIndex + 1),
          ];
        }
      });
    }
    return _newEdges;
  }, [edges, removeEdges]);

  const defaultProps = useMemo(() => {
    let _defaultProps = {};
    if (containerType === 'KeyboardAwareScrollView') {
      _defaultProps = {keyboardShouldPersistTaps: 'handled', bounces: false};
    }
    return _defaultProps;
  }, [containerType]);

  return (
    <SafeAreaView edges={newEdges} style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.Primary}
        animated={true}
      />
      <MainContainer
        style={[styles.container, mainStyle, style]}
        bounces={false}
        {...defaultProps}
        {...restProps}
        {...ContentContainerProps}>
        {isLoading ? (
          <ActivityIndicator color="black" size={'large'} />
        ) : (
          children
        )}
      </MainContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export {Container};

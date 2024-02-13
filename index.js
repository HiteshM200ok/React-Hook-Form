/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './source/App/App';
import {name as appName} from './app.json';

if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);

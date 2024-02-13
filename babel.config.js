module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@appconfig-root': './source/AppConfig/AppConfigRoot',
          '@assets': './source/Assets',
          '@assets-root': './source/Assets/AssetsRoot',
          '@components': './source/Components',
          '@components-root': './source/Components/ComponentsRoot',
          '@hooks': './source/Hooks',
          '@hooks-root': './source/Hooks/HooksRoot',
          '@navigation': './source/Navigation',
          '@navigation-route': './source/Navigation/NavigationRoutes',
          '@network': './source/Network',
          '@network-root': './source/Network/NetworkRoot',
          '@reducers': './source/Redux/Reducers',
          '@redux-store': './source/Redux/Store/ReduxConfigStore',
          '@screens': './source/Screens',
          '@utills': './source/Utills/Utills',
        },
      },
    ],
  ],
};

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Install project dependencies before run project
To install dependencies, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations!
You've successfully run the project

## Major dependencies 
- [ReactNavigation](https://reactnavigation.org/) - Routing and navigation for React Native apps.
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
- [Redux Toolkit](https://redux-toolkit.js.org/) - Maintain and update data across your applications for multiple components to share, all while remaining independent of the components.
- [Redux Persist](https://www.npmjs.com/package/redux-persist) - Persist and rehydrate a redux store.

## List of features
- Authentication managament, If you have already logged in, redirect to the home screen. Otherwise, the login screen will display.
- State management with help of [react-hook-form](https://react-hook-form.com/)
- Inline validation using rules props into controller of react-hook-form. In-line validation [example link](https://react-hook-form.com/get-started#ReactNative)
- Validation by schema into react-hook-form using Zod.
- Login credentials
   - email : eve.holt@reqres.in
   - password : cityslicka
- Sign up from values should be
   - email :   eve.holt@reqres.in
   - password : Password should contain at least
      - one lowercase letter [a-z]
      - one uppercase letter [A-Z]
      - one digit [0-9]
      - one special character [#?!@$%^&*-]
      - length should greater than 8 characters & less than 40 characters
      - [eg: Qwerty@123]()
         

### What and why to use React Hook Form? 

React Hook form manages complex form states and provides better performance than other libraries like formik. It provides the facility to validate the form on onChange and onSubmit. Also, it is lightweight and has no dependencies. 

# Learn More

To learn more about react-native, react-hook-form & zod take a look at the following resources:

- [React Native Website](https://reactnative.dev/) - learn more about react-native.
- [React Hook Form Website](https://react-hook-form.com/) - learn more about React hook form.
- [Zod Website](https://zod.dev/) - learn more about zod.

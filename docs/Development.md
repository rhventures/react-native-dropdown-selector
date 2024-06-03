# Development Guide

## Environment Setup

Follow the `Installing dependencies` section at [React Native: Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment).


## Clone the Repository

There are 2 ways to do this, **SSH** or **HTTPS**.

**SSH**: (terminals like Git Bash, Ubuntu, Powershell, etc.)
```
git clone git@github.com:rhventures/react-native-dropdown-selector.git
```
**HTTPS**: (IDEs like VSCode, IntelliJ, etc.)
```
git clone https://github.com/rhventures/react-native-dropdown-selector.git
```

## Install Dependencies

Install the component dependencies in the root of the project.
```
cd react-native-dropdown-selector
npm install
```

Install the example dependencies in the `./example` directory.
```
cd example
npm install
```

## Run the Example Project

Run the following command while inside the `./example` directory. If using an emulator, make sure that your emulator from Android Studio is already running.
```
npm run android
```

The example app should show up on your phone or emulator if you followed all the steps in the `Installing dependencies` section at [React Native: Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment).

Now, you should see changes you make to the component and example app show up on your device or emulator.
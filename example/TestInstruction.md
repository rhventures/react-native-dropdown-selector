# Instruction for Example App Tests

## Introduction

This document provides detailed instruction about how to run and modify tests for `Example App` in the `react-native-dropdown-selector` project. The example app is designed to demonstrate the usage of the `Select` and `MultiSelect` components.

Tests for `Example App` are based on framework [**Detox**](https://wix.github.io/Detox/). The main configuration file for Detox is located at `example/.detoxrc.js`. All the test files are located in the `example/e2e` directory. The tests are written in JavaScript.

Files under `e2e` directory overview:

1. `jest.config.js`: Jest configuration file for running tests.
2. `SingleSelect.test.js`: Tests for `Single Selector`.
3. `MultiSelect.test.js`: Tests for `Multi Selector`.
4. `ClearButton.test.js`: Tests for `Clear Button`.
5. `Theme.test.js`: Tests for `Theme Change`.
6. `Settings.test.js`: Tests for `Settings`, including `disable` and `searchable`.
7. `testAll.test.js`: This test file contains all the tests above, it can largely save your time if you want to test all features at the same time, as it will only launch the device and app once and reload react-native only when necessary. If you want to test everything really quick, please run this test file.

## Running Tests

To run the tests for the Example App, follow these steps:

1. **Go to the Example Directory**: Navigate to the `example` directory of the project. This is where the example app and its tests are located.

   ```bash
   cd example
   ```

2. **Install Dependencies**: Make sure you have all the necessary dependencies installed. You can do this by running:

   ```bash
   npm install
   ```

3. **Replace Demo Phone avd**: You can use **Android Studio** to create a phone only for this test. Highly recommend use **Medium Phone** as this test's setup is based on Medium Phone, if use other devices, some data migh be wrong. Besides, remember to name the demo phone in **lower case**, otherwise it migh cause some problems. Finally go to the configuration file `.detoxrc.js`, find the following lines, and replace `avdName`:

   ```
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'put your demo phone name here'
      }
    }
   ```

4. **Build the App**: Make sure you build the app before running tests:

    ```bash
    detox build --configuration android.emu.debug
    ```

5. **Run the Tests**: Once everything above is done, you are ready to run the tests!
    - Here are the overview of all the test files:

        1. `jest.config.js`: Jest configuration file for running tests.
        2. `SingleSelect.test.js`: Tests for `Single Selector`.
        3. `MultiSelect.test.js`: Tests for `Multi Selector`.
        4. `ClearButton.test.js`: Tests for `Clear Button`.
        5. `Theme.test.js`: Tests for `Theme Change`.
        6. `Settings.test.js`: Tests for `Settings`, including `disable` and `searchable`.
        7. `testAll.test.js`: This test file contains all the tests above, it can largely save your time if you want to test all features at the same time, as it will only launch the device and app once and reload react-native only when necessary. If you want to test everything really quick, please run this test file.

    - Commands to run tests:

        1. Run all `test files` under `e2e` directory (This is really slow! If you want to test everything really quick, please see the next command):

           ```bash
           detox test --configuration android.emu.debug
           ```

        2. Run all `tests` once:

           ```bash
           detox test /e2e/testAll.test.js --configuration android.emu.debug
           ```

        3. Run a specific test file:

           ```bash
           detox test /e2e/(filename) --configuration android.emu.debug
           ```

## Modifying Tests

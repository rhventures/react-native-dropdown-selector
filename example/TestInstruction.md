# Instruction for Example App Tests

## Introduction

This document provides detailed instruction about how to run and modify tests for `Example App` in `react-native-dropdown-selector` project. The example app is designed to demonstrate the usage of the `Select` and `MultiSelect` components. The tests are written to ensure that these components work as expected in various scenarios.

Tests for `Example App` are based on framework [**Detox**](https://wix.github.io/Detox/). The main configuration file is located at `example/.detoxrc.js`. All the test files are located in the `example/e2e` directory. The tests are written in JavaScript.

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

3. **Replace Demo Phone avd**: You can use **Android Studio** to create a phone only for this test. We highly recommend you to use default **Medium Phone** in Android Studio, as this test's setup is based on **Medium Phone**, if you choose to use other devices, some data migh be wrong, and you need to manually justify the number in all tests to fit your demo phone. Besides, remember to name the demo phone in **lower case** with **no space** (for example: `demophone`, `testphone`), otherwise it may cause some problems. Finally, go to the configuration file `.detoxrc.js`, find the following lines, and put your demo phone name after `avdName`:

   ```
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'put your demo phone name here'
      }
    }
   ```

4. **Build the App**: Make sure you build the app before running tests by running the following command:

    ```bash
    detox build --configuration android.emu.debug
    ```

5. **Run the Tests**: Once everything above is done, you are ready to run the tests!
   - Here is the overview of all test files under `e2e` directory:

      1. `jest.config.js`: Jest configuration file for running tests.
      2. `SingleSelect.test.js`: Tests for `Single Selector`.
      3. `MultiSelect.test.js`: Tests for `Multi Selector`.
      4. `ClearButton.test.js`: Tests for `Clear Button`.
      5. `Theme.test.js`: Tests for `Theme Change`.
      6. `Settings.test.js`: Tests for `Settings`, including `disable` and `searchable`.
      7. `testAll.test.js`: This test file contains all the tests above, it can largely save your time if you want to test all features at the same time, as it will only launch the device and app once and reload react-native only when necessary. If you want to test everything really quick, please run this file.

   - Notice before running tests:

      1. When you run tests with a new Android emulator, it may take a while to start the emulator and install the app. Please be patient.
      2. First time when you run the tests, if you encounter any issues related to `device not found`, `device.launchapp()`, `device.reloadReactNative()`, etc. this may be due to the emulator not being started properly. Please open a new terminal, go into the example folder, and run the following command:

         ```bash
         npx react-native start
         ```

         Then re-run the tests. This should resolve the issue. If you still encounter issues, please try to restart the emulator or your computer, and make sure you followed all the instructions above.

      3. First time when you run `Searchable Selection Tests` (in `Settings.test.js` and `testAll.test.js`), you may encounter an issue like `text not being found`, this is because the first time you try to **type in** something on a new Android emulator, there will be a pop-up window to show some tips about how to use the keyboard. You can just click on the ***Cancel*** button to close the pop-up window, and then re-run the tests. This should resolve the issue. If you still encounter issues, please try re-run the tests two to three times, or restart the emulator, and make sure you followed all the instructions above.

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

   - Results: After running the tests, you will see the results in the terminal. If all tests pass, you will see a message indicating that all tests have passed. If any test fails, you will see an error message indicating which test failed and why.

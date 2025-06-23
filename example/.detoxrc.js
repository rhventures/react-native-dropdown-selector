const isWin = process.platform === 'win32';

/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/example.app',
      build: 'xcodebuild -workspace ios/example.xcworkspace -scheme example -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/example.app',
      build: 'xcodebuild -workspace ios/example.xcworkspace -scheme example -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      build: `cd android && ${isWin ? 'gradlew.bat' : './gradlew'} assembleDebug assembleAndroidTest -DtestBuildType=debug`,
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      // testBinaryPath: 'custom/path/to/app-debug-androidTest.apk', // if you have a separate test APK, put it here
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      build: `cd android && ${isWin ? 'gradlew.bat' : './gradlew'} assembleRelease assembleAndroidTest -DtestBuildType=release`,
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      // testBinaryPath: 'custom/path/to/app-release-androidTest.apk', // if you have a separate release APK, put it here
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      headless: true,
      device: {
        avdName: 'demophone' //Replace it with your AVD name
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};

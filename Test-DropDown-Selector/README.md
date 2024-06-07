# Using APPIUM and APPIUM Inspector for React Native GUI testing on Android Applications

## Why APPIUM? 
Well... Selenium does not support mobile apps for test yet... Appium can not only be used for testing web apps, but it can also be used for testing iOS, Android or Watch OS such as Tizen. 

If you would like to know more information about Appium Software, here is the URL:
https://appium.io/docs/en/latest/intro/

## General Prerequisites for using APPIUM

### Programming Proficiency
-   Acceptable Knowledge in Javascript, Java, or Python.

### Install Node.JS
-   https://nodejs.org/en


## Android Setup
-   [Install Android Studio](https://developer.android.com/studio?hl=es-419&gclsrc=aw.ds&gclid=Cj0KCQjwyOuYBhCGARIsAIdGQRNrDv20QvoOy_-I5E1LoZdOLu3nvhlwX_7EjPeHcE1kGQNNcIVOme0aAqckEALw_wcB) 
-   [Android Home Setup](https://www.testingdocs.com/setting-android_home-environment-variable-on-windows) -> this could already be done if you have android studio set up already.

### Install Appium Inspector
-   [Download the compatable Appium Inspector here](https://github.com/appium/appium-inspector/releases)
-   I used the win.x64.exe

### Install Appium
-   [Appium](https://appium.io/docs/en/latest/quickstart/install/)
or run this command in your terminal:
```
npm install -g appium
```
Check your appium version using 
```
appium -v
```
### Execute Appium Doctor
For Appium to work, the necessary downloads must be checked.
run:
```
npm install appium doctor -g
```
and then run:
```
appium-doctor
```
-   If there is necessary fix that must be done, it must be done. For optional fixes, it can be ignored.

### Install Appium Drivers
We will use a driver for the Appium to function properly. Run:
```
appium driver install uiautomator2
```
You can check the installed drivers using:
```
appium driver list
```

### Generate a debug app to test.
If you already have the app as an apk file, then you can skip this step

If you do not have an apk file to test:
1. cd into your root of the project terminal and run:
```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
2. cd into your android directory and run:
```
./gradlew assembleDebug
```
3. You should be able to find your app-debug.apk inside \n
"yourProject/android/app/build/outputs/apk/debug/app-debug.apk"

### Make a Test Folder in your project
1. From the root of your project directory, create a new folder for testing.
2. In the new folder, create new folders named "app" and "test"
3. In the app folder, copy and paste your debug app you generated above
![alt text](image.png)





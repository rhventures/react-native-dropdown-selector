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
-   [Android Home Setup](https://www.testingdocs.com/setting-android_home-environment-variable-on-windows)

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






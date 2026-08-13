# CI Pipeline Build Workflow

## Overview
This file includes notes, details, and explanations for the CI pipeline workflow of the React Native Dropdown Selector example app in `build.yaml`.

### Basic Pipeline Setup
```
on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:
```
The above code just specifies that GitHub actions with run upon every push on the *main* branch and any pull request made.

```
jobs:
  build-app:
    name: Build Example App (${{ matrix.platform }})
    runs-on: ${{ matrix.runner }}
    strategy:
      matrix:
        include:
          - platform: android
            runner: ubuntu-latest
          - platform: ios
            runner: macos-latest
```
This is the main syntax to specify the jobs running as part of Github Actions. They're both build jobs for building our example app, one for android and the other for iOS.

### CI Pipeline Steps Common to Both Builds

1. Checkout via **actions/checkout@v4**: Downloads repo code onto the GitHub actions runner so that our workflow cana access it.

2. Setting up Node.js via **actions/setup-node@v6**: Installs the desired Node version, at time of writing `22`.

3. Install component and example app dependencies: Done via `npm ci` in project root `/` and `example` directories.

### Android Specific Build Steps

1. Java Setup via **actions/setup-java@v5**: Java 17 is required.

2. Android SDK setup via **android-actions/setup-android@v3**: Sets up required Android SDK tools

3. Build Android App with `./gradlew assembleDebug` command

#### So far, the Android Build workflow has been working successfully everytime and hasn't required modification in long time.

### iOS Specific Build Steps

1. Cache CocoaPods via **actions/cache@v4** to speed workflow - checks for the Podfile.lock file for dependencies. **No errors encountered with this step.**

2. Cache iOS builds via **irgaly/xcode-cache@v1** to store/restore Xcode's build cache and speed up workflow. **No errors encountered witht this step.**

3. Setup Ruby via **ruby/setup-ruby@v1** to download a prebuilt ruby and add it to the path. When building the app locally and as specified in `Gemfile.lock`, Ruby `2.6.10` was being used so the same is installed for CI as well.

    The `bundle-cache: true` step runs `bundle install` behind the hood and caches the result to speed up subsequent runs.

**This was a new step added to install the correct version of Ruby as it didn't exist before.**

4. ```
    bundle install
    bundle exec pod install
    ```

    The first command installs correct version of bundler (same as one used locally and specified in Gemfile.lock). We then use this bundler to lock in the correct CocoaPods version from the Gemfile.

    The `bundle install` command is necessary to install CocoaPods following which the `bundle exec pod install` is what actually gets the specific versions of libraries we need from the Podfile.

    **Newly added step in the build pipeline. It is not evident as of now if this process can be simplified.**

    **Additionally, for an initial successful CI pipeline run, I also included `pod update hermes-engine --no-repo-update` in between the two bundle commands based on a suggestion providd by Github post a hermes error message. In consequent runs this was no longer needed. But if in future we run into a similar issue we might need to temporarily include it again.**

5. Setup correct Xcode version: It was found that versions before `26.3.0` don't work.

6. Pre-load iOS platform SD via `xcodebuild -downloadPlatform iOS`: Downloads necessary iOS similator files and SDKs to build and test the app. Very important and cannot be ommitted (would result in errors).

7. ```
    run: |
        set -o pipefail
        gem install xcpretty
        xcodebuild -workspace example.xcworkspace \
                    -scheme example \
                    -sdk iphonesimulator \
                    -configuration Debug \
                    -derivedDataPath ../../xcode-derived-data \
                    build | xcpretty
    ```

    The actual iOS build code. Use of **xcpretty** and `gem install xcpretty` is optional but useful for cleaner and concise output message.

**Important Note: The `Podfile.lock` was generated using a newer version of cocoapods (1.16.2) locally and reflects the same at the end of the file, but when doing any operations such as `bundle exec pod install` it uses the version of cocoapods specified in the Gemfile.lock (1.15.2). Thus the versions are different and out of sync but do not appear to impact the application build as of now. There are newer cocoapod versions which we might have to switch to in future and reflect the same in `Gemfile` / `Gemfile.lock` as well but the process should be undertaken carefully because even for cocoapods `1.16.0` there's also a minimum version bump of `xcodeproj` to `1.26.0` which would require us to update that as well, currently our Gemfile restricts it to `< 1.26.0`, but the `1.26.0` version is known to cause CI/CD pipeline issues as seen in https://discuss.bitrise.io/t/sandbox-file-write-create-errors-after-the-xcodeproj-gem-was-auto-updated-to-1-26-0/24643.**

### Things to watch out for future

Unlike android build workflow, the iOS build workflow is very fragile due to the libraries and dependencies specific to iOS that need to undergo periodic updates and in some cases have to be maintained in sync. So in case of future errors in the pipeline for iOS builds, the following tools or dependencies serve as a good starting point of review.
- Cocoapods
- Ruby
- Bundler
- Xcode
- Hermes



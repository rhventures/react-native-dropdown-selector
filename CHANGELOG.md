# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add a row of 3 plain single selectors to example app ([#19](https://github.com/rhventures/react-native-dropdown-selector/pull/19)).
- Add a row of 3 plain multi selectors to example app ([#19](https://github.com/rhventures/react-native-dropdown-selector/pull/19)).
- Add a customized single selector to example app ([#19](https://github.com/rhventures/react-native-dropdown-selector/pull/19)).
- Add a customized multi selector to example app ([#19](https://github.com/rhventures/react-native-dropdown-selector/pull/19)).
- Add an animated GIF showcasing the example app on README ([#23](https://github.com/rhventures/react-native-dropdown-selector/pull/23)).
- Selectors are now able to be disabled via providing a boolean prop ([#25](https://github.com/rhventures/react-native-dropdown-selector/pull/25)).
- Selectors are now able to have a search bar via providing a boolean prop ([#27](https://github.com/rhventures/react-native-dropdown-selector/pull/27)).
- Add a plain multi selector to example app that toggles the `disabled` and `searchable` prop in all other selectors ([#28](https://github.com/rhventures/react-native-dropdown-selector/pull/28)).
- Add pre-commit hooks to ensure code quality ([#53](https://github.com/rhventures/react-native-dropdown-selector/pull/53)).
- Added a new string prop `theme` to allow explicit customization of `Select` and `MultiSelect` components. Options are `system`, `light`, and `dark` ([#55](https://github.com/rhventures/react-native-dropdown-selector/pull/55)).

### Changed

- Internal: Replaced `SelectorPos`, `listWidth`, and `listX` with `SelectorRect` ([#21](https://github.com/rhventures/react-native-dropdown-selector/pull/21))
- Content inside the dropdown list will now be cut off if it extends beyond the dropdown list boundaries ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).
- Technical details from README is now moved to GitHub Wiki ([#23](https://github.com/rhventures/react-native-dropdown-selector/pull/23)).
- Old screenshots of the example app are replaced by new ones ([#23](https://github.com/rhventures/react-native-dropdown-selector/pull/23)).
- Cleanup npm packages in preparation for a 0.2.0 release. ([#67](https://github.com/rhventures/react-native-dropdown-selector/pull/67))
- The `onRemove` prop is added to the selector components to be triggered when items are removed, rather than triggering `onSelect` ([#60](https://github.com/rhventures/react-native-dropdown-selector/pull/60)).

### Removed

- Background of the dropdown arrow is removed ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).

### Fixed

- Width of the dropdown lists becomes equal with the selector box by default, rather than expanding as wide as the screen width regardless of the selector box width ([#20](https://github.com/rhventures/react-native-dropdown-selector/pull/20)).
- Setting a custom numeric `width` style for `listStyle` now works as intended ([#20](https://github.com/rhventures/react-native-dropdown-selector/pull/20)).
- Setting `center` for a custom `alignSelf` style for `listStyle` will now center it correctly ([#20](https://github.com/rhventures/react-native-dropdown-selector/pull/20)).
- Specifying a percentage for a custom `width` style for `listStyle` will now be properly handled ([#21](https://github.com/rhventures/react-native-dropdown-selector/pull/21))
- The dropdown list offset now correctly aligns with the selector box when positioned above it with different default list height and when the list height is not max height ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).
- The clear button for multi select no longer blocks the dropdown list in landscape mode ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).
- Setting a default value for multi select now works as intended ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).
- The dropdown list now move above the selector box based on current dropdown list height, not max height ([#22](https://github.com/rhventures/react-native-dropdown-selector/pull/22)).
- The dropdown list now no longer lags behind when trying to render in a new position ([#59](https://github.com/rhventures/react-native-dropdown-selector/pull/59)).
- Pressing the clear button now also triggers `onRemove` prop for all items removed ([#62](https://github.com/rhventures/react-native-dropdown-selector/pull/62)).
- The styling of the example app's background and text now update dynamically based on light/dark mode. ([#69](https://github.com/rhventures/react-native-dropdown-selector/pull/69))

## [0.1.0] - 2024-06-28

Initial release

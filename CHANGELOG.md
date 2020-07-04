# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1]
### Changed
- Modified the button design
- Fixed the security vulnerabilities

## [1.2.0]
### Added
- Added couple of new event emitters `dropInOriginalBucket` and `dropInDestinationBucket`.
- Added more documentation for events in the README.

## [1.1.0]
### Changed
- Changed the css class name to be more specific to the component
- Changed the css value to make the cards not tilt
- Changed the original container to scroll vertically rather than horizontally.
- Bug fix: When everything from original bucket was moved to dropzones, original used to collapse. Now, it doesnt and the user can move the cards back to original.

## [1.0.0](https://github.com/smaharj1/vue-drag-and-drop-kanban/releases/tag/v1.0.0) - 2020-04-10
### Added
- Added new props
  - **inPlace**: makes in place changes to props dropzones. Enabled by default
  - **enableSave**: Enable Save button
  - **enableCancel**: Enable Cancel button 
- Changelog.md file added

### Changed
- Introduced vue slots for the content of each card. Users can have their own card components
- Enabling list of objects to be passed rather than string. Also, works for string. The change will not break previous version.
- `save` event's response body has changed to reflect the items in original list and dropzones when save pressed.
- Modified documentation

### Removed
- Removed the logic for validation. Parent components can handle this during `save`

---

## [0.0.16](https://github.com/smaharj1/vue-drag-and-drop-kanban/releases/tag/v0.0.16) - 2020-04-06
### Added
- Added more documentation
  - Code of Conduct
  - Template for creating pull request
  - Templates for raising an issue
  - Update on Readme.md to include more details on installation and usage

- Added Test Framework
  - Added Jest test for the component
  - Tests generate code coverage report
  - Added test cases. Current coverage about ~52%.

- Husky implementation
  - Added husky so that the test is ran every time devs try to push to improve code quality
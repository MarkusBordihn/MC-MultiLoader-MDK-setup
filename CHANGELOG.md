# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-15

### Added
- Automated project setup for MC-MultiLoader-MDK
- Interactive CLI with guided prompts
- Support for Minecraft versions 1.18.2, 1.20.1, and 1.21.1
- Multi-loader support (Forge, Fabric, NeoForge)
- Automatic placeholder replacement in template files
- Binary file preservation (gradle-wrapper.jar, images, etc.)
- Special file handling (.gitignore, .gitattributes)
- Comprehensive test suite with 31 tests
- Integration tests for full project creation
- GitHub Actions workflows for CI/CD
- ESLint configuration with Google style guide
- TypeScript definitions for better IDE support

### Changed
- Improved error handling for file operations
- Optimized normalizer functions
- Enhanced project configuration defaults

### Fixed
- Binary files corruption during template processing
- .gitignore file modification issue
- Static method default parameters bug
- fs.copySync error checking
- Security warning for spawnSync shell option
- Package.json path resolution for cross-directory execution

[1.0.0]: https://github.com/MarkusBordihn/MC-MultiLoader-MDK-setup/releases/tag/v1.0.0

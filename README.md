# Themes Time Switcher

This extension has not been packaged and published.

A Visual Studio Code extension that automatically switches themes (color and file icon themes) based on the time of day.

## Features

- Automatically switches between themes at regular intervals.
- Allows manual reloading of themes via a command.

## Configuration

A sample configuration looks like this:

```json
"themesTimeSwitcher": {
    "mappings": {
      "18:00": {
        "color": "Firefox Dark"
      },
      "00:00": {
        "color": "Firefox Light"
      }
    }
  }
```

## Installation and Local Development

1. Clone this repository or download the source code.
2. Run `pnpm install` to install dependencies.
4. Launch the extension in a new VS Code instance by pressing `F5` in your development environment.

### Manual Theme Reload
You can manually reload the themes by running the `Themes Time Switcher: Reload` command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
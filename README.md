# IPod Simulator

A simple IPOD simulator created with react, where you can interact with the UI. You can open the menu and select any option. With the sub menu, you can select the songs and play.

## Table of Contents

- [Features](#backend-features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Known Issues & Improvements](#known-issues-&-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Can view and control the menu with the wheel.
  - Main screen with an image.
  - Menu and sub menu.
  - Media player.
- Buttons in the wheel will control the screen:
  - MENU:
    - will open or close the menu.
    - When any option is selected, and MENU button is clicked, the corresponding screen will be shown.
  - WHEEL:
    - When opened the menu, by rotating the wheel will select options (in both directions)
  - SELECT: (round button in the middle of the wheel)
    - Used to show the selected menu item.
  - Forward:
    - Used to forward the current playing song (by 1 sec).
  - Backward:
    - Used to backward the current playing song (by 1 sec).
  - Play/Pause:
    - Used to play or pause the current selected song when opened.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/ipod-App-react.git

   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the app: ([see React Docs for more scripts](#react-readme-file))

```bash
  npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- ReactJS
- react-dom
- react-scripts
- styled-components
- zingtouch

## React ReadMe file

- [ReadMe.md](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md)

## Known Issues & Improvements

- Issues:

  - After opening the sub menu, when the wheel is rotated, the option in the sub menu will get selected. However, the UI is a step delayed and the current selected item will be the next item that will come after the current highlighted item in the menu.

- Improvements:
  - There is only one song in the "All Songs" option in the sub menu. Can be improved to add multiple songs.
  - The songs should be fetched from an API instead hardcoding.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

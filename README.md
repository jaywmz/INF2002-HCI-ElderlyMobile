Elderly Healthcare App
This mobile application is designed to support elderly users in managing their healthcare tasks, such as booking appointments, setting reminders, and using voice commands for easier navigation.

## Features

- **Login and Registration**: Allows users to log in or register for app access.
- **Appointment Management**: Users can create, view, and edit medical appointments.
- **Medication Reminders**: Users can set reminders for medications.
- **Voice Assistant**: Integrates a voice assistant (text-to-speech) to guide users.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: Download it [here](https://nodejs.org/).
- **Expo CLI**: Install globally with:
    ```bash
    npm install -g expo-cli
    ```

## Project Setup

1. **Clone the repository**
     ```bash
     git clone https://github.com/yourusername/elderly-healthcare-app.git
     ```

2. **Navigate to the project directory**
     ```bash
     cd ElderlyHealthCareApp
     ```

3. **Install dependencies**
     ```bash
     npm install
     ```

4. **Install required libraries**
     Use the commands below to install libraries for navigation, gesture handling, and voice functionality:
     ```bash
     npm install @react-navigation/native
     expo install react-native-screens react-native-safe-area-context
     npm install @react-navigation/stack
     expo install react-native-gesture-handler
     expo install expo-speech
     ```

## Start the app

Run the app locally with:
```bash
expo start
```
This will open Expo DevTools in your browser. Use the Expo Go app on your device to scan the QR code and preview the app.

## Project Structure

- **App.tsx**: The main entry point for the app, initializing navigation and screen routing.
- **assets/**: Contains static assets like images for service icons.
- **screens/**: Holds all screen components, including:
    - `LoginScreen.tsx`, `RegistrationScreen.tsx`: For user authentication.
    - `HomeScreen.tsx`: Main landing page with navigation to services.
    - `CreateAppointmentScreen.tsx`, `ViewEditAppointmentScreen.tsx`, `ReminderScreen.tsx`: Feature-specific screens for managing appointments and reminders.
- **styles/Theme.ts**: Contains global styles to ensure a cohesive design across screens.
- **types.ts**: Defines shared types for navigation and component props.

### Folder Structure Overview

```bash
.
├── assets/                   # Image and icon assets
├── screens/                  # App screens
│   ├── LoginScreen.tsx
│   ├── RegistrationScreen.tsx
│   ├── HomeScreen.tsx
│   ├── CreateAppointmentScreen.tsx
│   ├── ViewEditAppointmentScreen.tsx
│   ├── ReminderScreen.tsx
├── styles/
│   └── Theme.ts              # Global styling
├── App.tsx                   # Main entry point and navigation setup
├── types.ts                  # Type definitions for navigation and props
├── package.json              # Project metadata and dependencies
└── README.md
```

## Libraries Used

- **@react-navigation/native & @react-navigation/stack**: For screen navigation and stack-based routing.
- **expo-speech**: Adds a voice assistant with text-to-speech functionality.
- **react-native-gesture-handler**: Enables gesture handling, such as swiping, within the app.

## License

This project is licensed under the MIT License.
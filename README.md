# Elderly Healthcare App

This project is a mobile application designed to help elderly users manage their healthcare tasks, such as booking appointments, setting reminders, and navigating the app with voice commands.

## Features

- **Login and Registration**: Users can log in or register to access the app.
- **Appointment Booking**: Users can create and edit their medical appointments.
- **Reminder Setup**: Users can set medication reminders.
- **Voice Assistant**: The app includes a voice assistant (using text-to-speech) to help guide users.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: You can download it [here](https://nodejs.org/).
- **Expo CLI**: If you haven't installed it, run the command below to install it globally.

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

    Run the following command to install all necessary dependencies:

    ```bash
    npm install
    ```

4. **Install required libraries**

    Install libraries for navigation, gesture handling, and voice functionality:

    ```bash
    npm install @react-navigation/native
    expo install react-native-screens react-native-safe-area-context
    npm install @react-navigation/stack
    expo install react-native-gesture-handler
    expo install expo-speech
    ```

5. **Start the app**

    You can run the app locally using the following command:

    ```bash
    expo start
    ```

    This will open the Expo developer tools in your browser. Use Expo Go on your mobile device to scan the QR code and see the app in action.

## Project Structure

- **App.tsx**: The main entry point for the app, containing the stack navigation between the different screens.
- **screens/**: Contains the different screens of the app (Login, Registration, Home, CreateAppointment, ViewEditAppointment, Reminder).

    ```bash
    .
    ├── assets/
    ├── node_modules/
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── RegistrationScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── CreateAppointmentScreen.tsx
    │   ├── ViewEditAppointmentScreen.tsx
    │   ├── ReminderScreen.tsx
    ├── App.tsx
    ├── package.json
    └── README.md
    ```

## Libraries Used

- **@react-navigation/native**: For navigating between different screens.
- **@react-navigation/stack**: For stack navigation (moving between screens).
- **expo-speech**: For the voice assistant (text-to-speech).
- **react-native-gesture-handler**: For handling gestures in the app, such as swiping.

## Next Steps

The app currently uses hardcoded logic for login and registration. You can extend the project by:

- Adding real user authentication.
- Integrating a backend to manage appointments and reminders.
- Implementing persistent storage for users’ data.

## License

This project is licensed under the MIT License.

---

This README.md provides a clear guide on how to set up and run your app, along with a description of the project structure, libraries used, and possible next steps. You can adjust the URL for cloning the repository and expand the Next Steps section as your project progresses.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens with updated filenames
import HomeScreen from './screens/HomeScreen';
import CreateApptScreen from './screens/CreateApptScreen';
import ViewEditApptScreen from './screens/ViewEditApptScreen';
import ReminderScreen from './screens/ReminderScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create Appointment" component={CreateApptScreen} />
        <Stack.Screen name="View/Edit Appointment" component={ViewEditApptScreen} />
        <Stack.Screen name="Reminders" component={ReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CreateApptScreen from './screens/CreateApptScreen';
import ViewEditApptScreen from './screens/ViewEditApptScreen';
import ReminderScreen from './screens/ReminderScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();

export default function App() {
  // State to store registered credentials
  const [registeredUser, setRegisteredUser] = useState<{ username: string; password: string } | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} registeredUser={registeredUser} />}
        </Stack.Screen>
        <Stack.Screen name="Registration">
          {(props) => <RegistrationScreen {...props} setRegisteredUser={setRegisteredUser} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create Appointment" component={CreateApptScreen} />
        <Stack.Screen name="View/Edit Appointment" component={ViewEditApptScreen} />
        <Stack.Screen name="Reminders" component={ReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

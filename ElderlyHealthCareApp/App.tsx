import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import CreateApptScreen from './screens/CreateApptScreen';
import ViewEditApptScreen from './screens/ViewEditApptScreen';
import ReminderScreen from './screens/ReminderScreen';
import { AuthProps, RegisteredUser } from './types';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="Create Appointment" 
        component={CreateApptScreen} 
        options={{
          tabBarLabel: 'New Appointment',
          tabBarIcon: ({ color, size }) => <Icon name="calendar" type="font-awesome" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="View/Edit Appointment" 
        component={ViewEditApptScreen} 
        options={{
          tabBarLabel: 'View/Edit',
          tabBarIcon: ({ color, size }) => <Icon name="edit" type="font-awesome" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="Reminders" 
        component={ReminderScreen} 
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({ color, size }) => <Icon name="bell" type="font-awesome" color={color} size={size} />,
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} registeredUser={registeredUser} />}
        </Stack.Screen>
        <Stack.Screen name="Registration">
          {(props) => <RegistrationScreen {...props} setRegisteredUser={setRegisteredUser} />}
        </Stack.Screen>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

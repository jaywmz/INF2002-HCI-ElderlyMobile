import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
const Tab = createMaterialTopTabNavigator();

function MainTabs({ registeredUser, setRegisteredUser }: AuthProps) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 }, // Customize label style
        tabBarIndicatorStyle: { backgroundColor: '#e91e63' }, // Customize indicator color
        swipeEnabled: true, // Enable swipe gestures between tabs
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} size={focused ? 30 : 24} />
          ),
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            registeredUser={registeredUser}
            setRegisteredUser={setRegisteredUser}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Create Appointment"
        component={CreateApptScreen}
        options={{
          tabBarLabel: 'New Appointment',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="calendar" type="font-awesome" color={color} size={focused ? 30 : 24} />
          ),
        }}
      />
      <Tab.Screen
        name="View/Edit Appointment"
        component={ViewEditApptScreen}
        options={{
          tabBarLabel: 'View/Edit',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="edit" type="font-awesome" color={color} size={focused ? 30 : 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={ReminderScreen}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="bell" type="font-awesome" color={color} size={focused ? 30 : 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} registeredUser={registeredUser} />}
          </Stack.Screen>
          <Stack.Screen name="Registration">
            {(props) => <RegistrationScreen {...props} setRegisteredUser={setRegisteredUser} />}
          </Stack.Screen>
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
          >
            {(props) => (
              <MainTabs
                {...props}
                registeredUser={registeredUser}
                setRegisteredUser={setRegisteredUser}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

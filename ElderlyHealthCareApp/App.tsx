import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';

// Import screens
import { AuthProps, RegisteredUser } from './types';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import CreateApptScreen from './screens/CreateApptScreen';
import ViewEditApptScreen from './screens/ViewEditApptScreen';
import ReminderScreen from './screens/ReminderScreen';
import CalendarScreen from './screens/Calendar';
import LocationsScreen from './screens/Locations';
import TimeslotsScreen from './screens/Timeslots';
import CreateApptConfirmationScreen from './screens/CreateApptConfirmation';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabs({ registeredUser, setRegisteredUser }: AuthProps) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: '#e91e63',
          swipeEnabled: true,
          tabBarIndicatorStyle: { backgroundColor: '#e91e63' },
          tabBarStyle: { backgroundColor: '#fff' },
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
          options={{
            tabBarLabel: 'Appt',
            tabBarIcon: ({ color, focused }) => (
              <Icon name="calendar" type="font-awesome" color={color} size={focused ? 30 : 24} />
            ),
          }}
        >
          {(props) => (
            <CreateApptScreen
              {...props}
              registeredUser={registeredUser}
              setRegisteredUser={setRegisteredUser}
            />
          )}
        </Tab.Screen>
        
        <Tab.Screen
          name="View/Edit Appointment"
          options={{
            tabBarLabel: 'View/Edit',
            tabBarIcon: ({ color, focused }) => (
              <Icon name="edit" type="font-awesome" color={color} size={focused ? 30 : 24} />
            ),
          }}
        >
          {(props) => (
            <ViewEditApptScreen
              {...props}
              registeredUser={registeredUser}
              setRegisteredUser={setRegisteredUser}
            />
          )}
        </Tab.Screen>
        
        <Tab.Screen
          name="Reminders"
          options={{
            tabBarLabel: 'Reminders',
            tabBarIcon: ({ color, focused }) => (
              <Icon name="bell" type="font-awesome" color={color} size={focused ? 30 : 24} />
            ),
          }}
        >
          {(props) => (
            <ReminderScreen
              {...props}
              registeredUser={registeredUser}
              setRegisteredUser={setRegisteredUser}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
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

          <Stack.Screen name="Locations">
            {(props) => (
              <LocationsScreen
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Calendar">
            {(props) => (
              <CalendarScreen 
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name='Timeslots'>
          {(props) => (
              <TimeslotsScreen 
                {...props}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name='CreateApptConfirmation'>
          {(props) => (
              <CreateApptConfirmationScreen
                {...props}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens based on your file structure
import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import CalendarScreen from './screens/create-appointment screens/Calendar';
import CreateApptConfirmationScreen from './screens/create-appointment screens/CreateApptConfirmation';
import LocationsScreen from './screens/create-appointment screens/Locations';
import TimeslotsScreen from './screens/create-appointment screens/Timeslots';
import CurrentApptScreen from './screens/edit-appt/CurrentApptScreen';
import EditYourApptScreen from './screens/edit-appt/EditYourApptScreen';
import CreateApptScreen from './screens/mainscreens/CreateApptScreen';
import HomeScreen from './screens/mainscreens/HomeScreen';
import ReminderScreen from './screens/mainscreens/ReminderScreen';
import ViewEditApptScreen from './screens/mainscreens/ViewEditApptScreen';
import SettingScreen from './screens/SettingScreen';
import { Appointment, AuthProps, RegisteredUser } from './types';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabs({ registeredUser, setRegisteredUser, isAiEnabled }: AuthProps & { isAiEnabled: boolean }) {
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
              isAiEnabled={isAiEnabled}
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
              isAiEnabled={isAiEnabled}
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
              isAiEnabled={isAiEnabled}
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
              isAiEnabled={isAiEnabled}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);
  const [isAiEnabled, setIsAiEnabled] = useState(true);

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

          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {(props) => (
              <MainTabs
                {...props}
                registeredUser={registeredUser}
                setRegisteredUser={setRegisteredUser}
                isAiEnabled={isAiEnabled}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Locations">
            {(props) => <LocationsScreen {...props} isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="Calendar">
            {(props) => <CalendarScreen {...props} isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="Timeslots">
            {(props) => <TimeslotsScreen {...props} isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="CreateApptConfirmation">
            {(props) => <CreateApptConfirmationScreen {...props} isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="Current Appointment">
            {(props) => <CurrentApptScreen {...props}  isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="Edit Appointment">
            {(props) => {
              const appointment = (props.route.params as { appointment?: Appointment })?.appointment || {
                location: '',
                day: '',
                month: '',
                year: '',
                time: '',
                type: '',
              };
              const onSave = (props.route.params as { onSave?: (newAppointment: Appointment) => void })?.onSave || (() => {});

              return (
                <EditYourApptScreen
                  {...props}
                  route={{
                    ...props.route,
                    params: { appointment, onSave },
                  }}
                  isAiEnabled={isAiEnabled}
                  navigation={props.navigation}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="Setting" options={{ headerTitle: 'Settings' }}>
            {(props) => (
              <SettingScreen
                {...props}
                isAiEnabled={isAiEnabled}
                setIsAiEnabled={setIsAiEnabled}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

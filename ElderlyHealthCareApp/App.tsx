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
import CreateApptConfirmationScreen from './screens/create-appointment screens/Confirm';
import LocationsScreen from './screens/create-appointment screens/Locations';
import TimeslotsScreen from './screens/create-appointment screens/Timeslots';
import AppointmentTypeScreen from './screens/create-appointment screens/AppointmentType';
import CurrentApptScreen from './screens/edit-appt/CurrentApptScreen';
import EditYourApptScreen from './screens/edit-appt/EditYourApptScreen';
import HomeScreen from './screens/mainscreens/HomeScreen';
import ReminderCalendarScreen from './screens/create-reminder screens/ReminderCalendar';
import ReminderTimeslotScreen from './screens/create-reminder screens/ReminderTimeslots';
import ReminderConfirmScreen from './screens/create-reminder screens/ReminderConfirm';
import ReminderSuccessScreen from './screens/create-reminder screens/ReminderSuccess';
import SettingScreen from './screens/mainscreens/SettingScreen';
import { Appointment, AuthProps, RegisteredUser } from './types';
import CreateApptSuccessScreen from './screens/create-appointment screens/Success';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabs({ registeredUser, setRegisteredUser, isAiEnabled, currentScreenId, setCurrentScreenId }: AuthProps & { isAiEnabled: boolean, currentScreenId: number | null, setCurrentScreenId: React.Dispatch<React.SetStateAction<number | null>> }) {
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
              screenId={1}  // Assign a unique screen ID
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Setting"
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Icon name="cog" type="font-awesome" color={color} size={focused ? 30 : 24} />
            ),
          }}
        >
          {(props) => (
            <SettingScreen
              {...props}
              registeredUser={registeredUser}
              setRegisteredUser={setRegisteredUser}
              isAiEnabled={isAiEnabled}
              screenId={2}  // Assign a unique screen ID
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
            />
          )}
        </Tab.Screen>

        {/* <Tab.Screen
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
              screenId={3}  // Assign a unique screen ID
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
            />
          )}
        </Tab.Screen> */}

        {/* <Tab.Screen
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
              screenId={4}  // Assign a unique screen ID
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
            />
          )}
        </Tab.Screen> */}
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(null);
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [currentScreenId, setCurrentScreenId] = useState<number | null>(1); // Default to Home screen ID
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name=" ">
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
                currentScreenId={currentScreenId}
                setCurrentScreenId={setCurrentScreenId}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Choose Appointment Location">
            {(props) => <LocationsScreen {...props} isAiEnabled={isAiEnabled} setLocation={setLocation} />}
          </Stack.Screen>

          <Stack.Screen name="Calendar">
            {(props) => <CalendarScreen {...props} isAiEnabled={isAiEnabled} locationProp={location} setDate={setDate} />}
          </Stack.Screen>

          <Stack.Screen name="Timeslots">
            {(props) => <TimeslotsScreen {...props} isAiEnabled={isAiEnabled} date={date} setTime={setTime} />}
          </Stack.Screen>

          <Stack.Screen name="Appointment Type">
            {(props) => <AppointmentTypeScreen {...props} isAiEnabled={isAiEnabled} time={time} setType={setType} />}
          </Stack.Screen>

          <Stack.Screen name="Confirm">
            {(props) => <CreateApptConfirmationScreen {...props} isAiEnabled={isAiEnabled} location={location} date={date} time={time} type={type} />}
          </Stack.Screen>

          <Stack.Screen name="Success">
            {(props) => <CreateApptSuccessScreen {...props} isAiEnabled={isAiEnabled} />}
          </Stack.Screen>

          <Stack.Screen name="Current Appointment">
            {(props) => <CurrentApptScreen {...props} isAiEnabled={isAiEnabled} />}
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

          <Stack.Screen name="Reminder Calendar">
            {(props) => <ReminderCalendarScreen {...props} isAiEnabled={isAiEnabled} locationProp={location} setDate={setDate} />}
          </Stack.Screen>

          <Stack.Screen name="ReminderTimeslots">
            {(props) => <ReminderTimeslotScreen {...props} isAiEnabled={isAiEnabled} date={date} setTime={setTime} />}
          </Stack.Screen>

          <Stack.Screen name="ReminderConfirm">
            {(props) => <ReminderConfirmScreen {...props} isAiEnabled={isAiEnabled} date={date} time={time} />}
          </Stack.Screen>

          <Stack.Screen name="ReminderSuccess">
            {(props) => <ReminderSuccessScreen {...props} isAiEnabled={isAiEnabled} />}
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

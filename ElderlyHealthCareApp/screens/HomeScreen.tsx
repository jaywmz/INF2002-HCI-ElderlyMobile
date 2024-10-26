import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
} & AuthProps;

const HomeScreen = ({ navigation, registeredUser, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null);
    navigation.replace('Login');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Welcome, {registeredUser?.username}!</Text>

      {/* Button to navigate to Create Appointment */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Create Appointment')}
      >
        <Text style={globalStyles.buttonText}>Go to Create Appointment</Text>
      </TouchableOpacity>

      {/* Button to navigate to View/Edit Appointment */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate('View/Edit Appointment')}
      >
        <Text style={globalStyles.buttonText}>Go to View/Edit Appointment</Text>
      </TouchableOpacity>

      {/* Button to navigate to Reminders */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate('Reminders')}
      >
        <Text style={globalStyles.buttonText}>Go to Reminders</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20, backgroundColor: 'red' }]}
        onPress={handleLogout}
      >
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

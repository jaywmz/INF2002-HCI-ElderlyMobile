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
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Create Appointment')}
      >
        <Text style={globalStyles.buttonText}>Go to Create Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10, backgroundColor: 'red' }]}
        onPress={handleLogout}
      >
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

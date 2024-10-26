import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { globalStyles } from '../styles/Theme'; // Adjust the path if necessary

type ViewEditApptScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'View/Edit Appointment'
>;

type Props = {
  navigation: ViewEditApptScreenNavigationProp;
};

const ViewEditApptScreen = ({ navigation }: Props) => {
  return (
    <View style={globalStyles.container}>
      {/* Header text using global styles */}
      <Text style={globalStyles.headerText}>View or Edit Your Appointment</Text>
      
      {/* Edit Appointment button */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => alert('Editing Appointment')}
      >
        <Text style={globalStyles.buttonText}>Edit Appointment</Text>
      </TouchableOpacity>
      
      {/* Back to Home button */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewEditApptScreen;

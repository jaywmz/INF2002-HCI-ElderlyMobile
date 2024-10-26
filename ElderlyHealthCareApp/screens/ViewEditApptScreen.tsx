import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { globalStyles } from '../styles/Theme';

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
      <Text style={globalStyles.headerText}>View or Edit Your Appointment</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => alert('Editing Appointment')}
      >
        <Text style={globalStyles.buttonText}>Edit Appointment</Text>
      </TouchableOpacity>
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

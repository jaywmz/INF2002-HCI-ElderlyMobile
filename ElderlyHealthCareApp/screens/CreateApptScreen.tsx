import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CreateApptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create Appointment'>;

type Props = {
  navigation: CreateApptScreenNavigationProp;
};

const CreateApptScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Create Appointment</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>Save Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateApptScreen;

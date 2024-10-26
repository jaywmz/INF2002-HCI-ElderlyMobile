import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ReminderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reminders'>;

type Props = {
  navigation: ReminderScreenNavigationProp;
};

const ReminderScreen = ({ navigation }: Props) => {
  return (
    <View style={globalStyles.container}>
      {/* Header text using global styles */}
      <Text style={globalStyles.headerText}>Set Your Medicine Reminders Here</Text>
      
      {/* Save Reminder button */}
      <TouchableOpacity style={globalStyles.button} onPress={() => alert('Reminder Saved!')}>
        <Text style={globalStyles.buttonText}>Save Reminder</Text>
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

export default ReminderScreen;

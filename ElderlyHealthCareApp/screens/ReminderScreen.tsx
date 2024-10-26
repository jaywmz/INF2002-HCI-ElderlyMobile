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
      <Text style={globalStyles.headerText}>Set Your Medicine Reminders Here</Text>
      <TouchableOpacity style={globalStyles.button} onPress={() => alert('Reminder Saved!')}>
        <Text style={globalStyles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderScreen;

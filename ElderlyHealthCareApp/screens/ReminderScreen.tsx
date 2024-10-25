import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Import the RootStackParamList

type ReminderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Reminders'
>;

type Props = {
  navigation: ReminderScreenNavigationProp;
};

const ReminderScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Set Your Medicine Reminders Here</Text>
      <Button
        title="Save Reminder"
        onPress={() => alert('Reminder Saved!')}
      />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReminderScreen;

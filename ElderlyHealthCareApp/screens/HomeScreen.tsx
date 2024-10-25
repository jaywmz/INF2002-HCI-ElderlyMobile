import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Import the RootStackParamList

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Elderly Healthcare App</Text>
      <Button
        title="Create a New Appointment"
        onPress={() => navigation.navigate('Create Appointment')}
      />
      <Button
        title="View/Edit Appointment"
        onPress={() => navigation.navigate('View/Edit Appointment')}
      />
      <Button
        title="Go to Reminders"
        onPress={() => navigation.navigate('Reminders')}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
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

export default HomeScreen;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Import the RootStackParamList

type ViewEditApptScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'View/Edit Appointment'
>;

type Props = {
  navigation: ViewEditApptScreenNavigationProp;
};

const ViewEditApptScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>View or Edit Your Appointment</Text>
      <Button
        title="Edit Appointment"
        onPress={() => alert('Editing Appointment')}
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

export default ViewEditApptScreen;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types'; // Assuming you have defined RootStackParamList

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
} & AuthProps;

const HomeScreen = ({ navigation, registeredUser, setRegisteredUser }: Props) => {
  const handleLogout = () => {
    setRegisteredUser(null); // Clear the registered user state
    navigation.replace('Login'); // Navigate back to the Login screen
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {registeredUser?.username}!</Text>

      <Button
        title="Go to Create Appointment"
        onPress={() => navigation.navigate('Create Appointment')}
      />

      <Button
        title="Logout"
        onPress={handleLogout}
        color="red" // Optionally, you can set a different color for the logout button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { authPage } from '../../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RegisteredUser } from '../../types';

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
  setRegisteredUser: (user: RegisteredUser) => void;
};

const RegistrationScreen = ({ navigation, setRegisteredUser }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && password) {
      setRegisteredUser({ username, password });
      alert('Registration successful');
      navigation.navigate(' ');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={authPage.container}>
      <Text style={authPage.headerText}>Register</Text>
      <TextInput
        style={authPage.input}
        placeholder="Enter Singpass ID"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={authPage.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={authPage.button} onPress={handleRegister}>
        <Text style={authPage.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(' ')} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007AFF', fontSize: 20, marginTop: 15 }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;

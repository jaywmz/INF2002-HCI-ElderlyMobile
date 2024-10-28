import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RegisteredUser } from '../../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  registeredUser: RegisteredUser | null;
};

const LoginScreen = ({ navigation, registeredUser }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
    //   navigation.navigate('Main', { screen: 'Home' });
    // } else {
    //   alert('Incorrect username or password');
    // }
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Login</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007AFF' }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

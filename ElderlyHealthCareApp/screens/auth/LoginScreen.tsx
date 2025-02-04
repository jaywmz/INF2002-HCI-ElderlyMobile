import React, { useState } from 'react';
import { Image } from 'expo-image';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { authPage } from '../../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RegisteredUser } from '../../types';
import { useTimer } from '../../timer';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  registeredUser: RegisteredUser | null;
};

const LoginScreen = ({ navigation, registeredUser }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { startTimer } = useTimer();

  const handleLogin = () => {
    if (!registeredUser) {
      alert('No registered user found. Please register first.');
      return;
    }

    if (username === registeredUser.username && password === registeredUser.password) {
      startTimer();
      navigation.navigate('Main', { screen: 'Home' });
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleImageClick = () => {
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <View style={authPage.container}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#007AFF', marginBottom: 20,}}>Login/Register with SingPass</Text>
      <TouchableOpacity onPress={handleImageClick}>
        <Image 
          key="singpass-qr"
          style={{ width: 200, height: 200 }} 
          source={require('../../assets/singpass-qr.png')} 
        />
      </TouchableOpacity>
      <View style={{ width: '100%', height: 1, backgroundColor: '#ccc', marginVertical: 20 }} />
      <Text style={authPage.headerText}>Login with Password</Text>
      <TextInput
        style={authPage.input}
        placeholder="Enter Username"
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
      <TouchableOpacity style={authPage.button} onPress={handleLogin}>
        <Text style={authPage.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007AFF', fontSize: 22.5, marginTop: 25 }}>Register An Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
    // if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
    //   navigation.navigate('Main', { screen: 'Home' });
    // } else {
    //   alert('Incorrect username or password');
    // }
    startTimer();
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <View style={authPage.container}>
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 35}}>ElderlyWell</Text>
      <Text style={authPage.headerText}>Login with SingPass</Text>
      <Image style={{width: 200, height: 200}} source={require('../../assets/singpass-qr.png')}/>
      <View style={{ width: '100%', height: 1, backgroundColor: '#ccc', marginVertical: 20 }} />
      <Text style={authPage.headerText}>Login with Password</Text>
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
      <TouchableOpacity style={authPage.button} onPress={handleLogin}>
        <Text style={authPage.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007AFF', fontSize: 22.5, marginTop: 25}}>Register with Singpass</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

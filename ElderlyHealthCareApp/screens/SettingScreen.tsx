
import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/Theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthProps } from '../types';
import { useNavigation } from '@react-navigation/native';

// Define the navigation prop type for SettingScreen
type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

type Props = {
  navigation: SettingScreenNavigationProp;
} & AuthProps;

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const [isAiGuidanceEnabled, setIsAiGuidanceEnabled] = useState(false);

  const toggleSwitch = () => setIsAiGuidanceEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>AI Guidance Assistance</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isAiGuidanceEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbe4e4',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
  },
});

export default SettingScreen;

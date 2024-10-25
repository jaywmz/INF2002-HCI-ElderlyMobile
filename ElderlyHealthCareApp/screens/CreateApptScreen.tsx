import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CreateApptScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Create Appointment'
>;

type Props = {
    navigation: CreateApptScreenNavigationProp;
};

const CreateApptScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Appointment</Text>
            {/* Add your form components here */}
            <Button
                title="Save Appointment"
                onPress={() => {
                    // Handle save appointment logic here
                    navigation.navigate('Home');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default CreateApptScreen;
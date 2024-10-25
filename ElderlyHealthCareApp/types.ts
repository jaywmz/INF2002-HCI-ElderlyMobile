export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Main: {
      screen: 'Home' | 'Create Appointment' | 'View/Edit Appointment' | 'Reminders';
    };
    Home: undefined;
    'Create Appointment': undefined;
    'View/Edit Appointment': undefined;
    Reminders: undefined;
};
  
export type RegisteredUser = {
    username: string;
    password: string;
};
  
export type AuthProps = {
    registeredUser: RegisteredUser | null;
    setRegisteredUser: (user: RegisteredUser) => void;
};

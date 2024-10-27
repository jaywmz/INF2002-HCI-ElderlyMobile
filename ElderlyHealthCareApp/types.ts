// types.ts
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
    Calendar: undefined;
    Locations: undefined;
    Timeslots: undefined;
    CreateApptConfirmation: undefined;
};

export type RegisteredUser = {
    username: string;
    password: string;
} | null;
  
export type AuthProps = {
    registeredUser: RegisteredUser | null;
    setRegisteredUser: (user: RegisteredUser | null) => void;
};

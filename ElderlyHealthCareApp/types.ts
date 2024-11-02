// types.ts
export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Main: {
      screen: 'Home' | 'Create Appointment' | 'View/Edit Appointment' | 'Reminders' | 'Current Appointment';
    };
    Home: undefined;
    'Create Appointment': undefined;
    'View/Edit Appointment': undefined;
    Reminders: undefined;
    Calendar: undefined;
    Locations: undefined;
    Timeslots: undefined;
    CreateApptConfirmation: undefined;
    Setting: undefined;
    'Current Appointment': undefined;
    'Edit Appointment': {
        appointment: Appointment;
        onSave: (newAppointment: Appointment) => void;
    };
};

// Define Appointment type for ease of use
export type Appointment = {
    location: string;
    day: string;
    month: string;
    year: string;
    time: string;
    type: string;
};

export type RegisteredUser = {
    username: string;
    password: string;
} | null;

export type AuthProps = {
    registeredUser: RegisteredUser | null;
    setRegisteredUser: (user: RegisteredUser | null) => void;
};
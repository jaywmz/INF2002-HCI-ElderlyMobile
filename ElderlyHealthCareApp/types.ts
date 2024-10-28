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
    'Current Appointment': undefined; // Current Appointment route
    'EditYourApptScreen': {
      appointment: Appointment;
      onSave: (newAppointment: Appointment) => void;
    }; // Edit appointment route with parameters
  };
  
  export type RegisteredUser = {
    username: string;
    password: string;
  } | null;
  
  export type Appointment = {
    location: string;
    date: string;
    time: string;
    type: string;
  };
  
  export type AuthProps = {
    registeredUser: RegisteredUser | null;
    setRegisteredUser: (user: RegisteredUser | null) => void;
  };
  
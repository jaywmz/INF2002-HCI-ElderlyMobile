export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Main: { screen: 'Home' | 'Create Appointment' | 'View/Edit Appointment' | 'Reminders' | 'Current Appointment' };
    Home: undefined;
    Calendar: undefined;
    Locations: undefined;
    Timeslots: undefined;
    'Appointment Type': undefined;
    Confirm: undefined;
    Success: undefined;
    'Create Appointment': undefined;
    'View/Edit Appointment': undefined;
    Reminders: undefined;
    ReminderCalendar: undefined;
    ReminderConfirm: undefined;
    ReminderSuccess: undefined;
    ReminderTimeslots: undefined;
    Setting: undefined;
    'Current Appointment': undefined;
    'Edit Appointment': {
      appointment: Appointment;
      onSave: (newAppointment: Appointment) => void;
    };
    EditTime: { selectedDate: string; isAiEnabled: boolean };
  };
  
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
  
export type RootStackNavigationType = {
    AuthStack: undefined,
  };
  
  export type AuthStackNavigationType = {
    SignIn: undefined,
    SignUp: undefined,
    Location: undefined,
    Onboarding: undefined,
    SelectService: undefined,
    Boarding: undefined,
    Searching: undefined,
    BoardingSearch: undefined,
    More: undefined,
    Settings: undefined,
    GeneralSettings: undefined,
    Notification: undefined,
    ContactAmerica: undefined,
    PetDetails: {
      initialData?: {
        petType: string,
        dates: string,
        location: string,
      }
    },
  };
  
  
  export type BottomTabNavigationType = {
    
  };
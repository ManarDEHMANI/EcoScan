export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
    Welcome: undefined;
    Scanner: undefined;
    Profile: undefined;
    UserProfile: undefined;
    //UserHistory: undefined;
    UserHistory: { userId: string };
    Contact: undefined;
    AvatarPicker: undefined;
    ScientificBasis : undefined;
    // Result: { photoUri: string; predictions: Record<string, any> };
    Result: { photoUri: string; predictions: any; userId: string ;  showSaveButton?: boolean;};
    
  };
  
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Toast from 'react-native-toast-message';
import ErrorBoundary from 'react-native-error-boundary';
import RootStack from './src/navigation/RootStack';
// import RootStack from './src/navigation/RootStack';



const App = (): React.JSX.Element =>{
  
  const [fontsLoaded] = useFonts({
    // Poppins
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    // Pacifico
    'Pacifico-Regular': require('./assets/fonts/Pacifico-Regular.ttf'),
  });

  if (!fontsLoaded) return <></>;
  
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Provider store={store}>

          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
              />
              <RootStack />
              <Toast />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
} 

export default App;
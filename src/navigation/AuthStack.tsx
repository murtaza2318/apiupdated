import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from '../screens/Location/LocationScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SelectServiceScreen from '../screens/ServicePage/SelectServiceScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import { AuthStackNavigationType } from '../utils/types/NavigationTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardingScreen from '../screens/BoardingScreen/BoardingScreen';
import { BoardingSearching } from '../screens/BoardingSearchingResult/BoardingSearchingResult';
import MoreScreen from '../screens/MoreScreen/MoreScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingScreen';
import GeneralSettingsScreen from '../screens/GeneralSetting/GeneralSettingsScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import ContactAmericaScreen from '../screens/ContactAmerica';
import PetDetailsScreen from '../screens/PetDetails/PetDetailsScreen';

const Stack = createNativeStackNavigator();

 const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'SignIn'}>
            <Stack.Screen name={'SignIn'} component={SignInScreen} />
            <Stack.Screen name={'SignUp'} component={SignUpScreen} />
            <Stack.Screen name={'Location'} component={LocationScreen} />
            <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
            <Stack.Screen name={'SelectService'} component={SelectServiceScreen} />
            <Stack.Screen name={'Boarding'} component={BoardingScreen} /> 
            <Stack.Screen name={'BoardingSearch'} component={BoardingSearching} /> 
            <Stack.Screen name={'More'} component={MoreScreen} />   
            <Stack.Screen name={'Settings'} component={SettingsScreen} />
            <Stack.Screen name={'GeneralSettings'} component={GeneralSettingsScreen} />
            <Stack.Screen name={'Notification'} component={NotificationsScreen} />
            <Stack.Screen name={'ContactAmerica'} component={ContactAmericaScreen} />
            <Stack.Screen name={'PetDetails'} component={PetDetailsScreen} />

        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})


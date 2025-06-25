import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import { RootStackNavigationType } from '../utils/types/NavigationTypes';

const Stack = createStackNavigator<RootStackNavigationType>();

const RootStack = () => {
    function getInitialRoute(): "AuthStack" {
        return 'AuthStack'
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        initialRouteName={getInitialRoute()}
        >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            
        </Stack.Navigator>
    )
}

export default RootStack

const styles = StyleSheet.create({})


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../views/Home'
import AddFood from '../views/AddFood'
import { StatusBar } from 'react-native'

const Stack = createNativeStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="AddFood" component={AddFood} options={{headerShown: false}} />
            </Stack.Navigator>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        </NavigationContainer>
    )
}

export default Routes
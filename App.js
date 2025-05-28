import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Movie Hub"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#e50914',
            headerTitleStyle: {
              color: '#e50914',
              fontWeight: 'bold',
              fontSize: 30,
              fontFamily: 'cursive',
            },
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: 'Movie Details',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#e50914',
            headerTitleStyle: {
              color: '#e50914',
              fontSize: 22,
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

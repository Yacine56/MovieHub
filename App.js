import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen'; // Import FavoritesScreen
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  const commonHeaderOptions = {
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#e50914',
    headerTitleStyle: {
      color: '#e50914',
      fontWeight: '600',
    },
    headerTitleAlign: 'center',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Movies Hub"
          component={HomeScreen}
          options={{
            ...commonHeaderOptions,
            headerTitleStyle: {
              ...commonHeaderOptions.headerTitleStyle,
              fontSize: 30,
              fontFamily: 'cursive',
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            ...commonHeaderOptions,
            title: 'Movie Details',
            headerTitleStyle: {
              ...commonHeaderOptions.headerTitleStyle,
              fontSize: 22,
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            ...commonHeaderOptions,
            title: 'Favorites',
            headerTitleStyle: {
              ...commonHeaderOptions.headerTitleStyle,
              fontSize: 22,
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

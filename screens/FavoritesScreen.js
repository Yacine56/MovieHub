import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyles';

const API_KEY = 'c303323de4763e483da75371e01f1bb6';
const FAVORITES_KEY = '@favorite_movies';

export default function FavoritesScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavoriteMovies();
    });

    return unsubscribe;
  }, [navigation]);

  const loadFavoriteMovies = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoriteIds = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      const moviesData = await Promise.all(
        favoriteIds.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
          );
          return await res.json();
        })
      );

      setFavoriteMovies(moviesData);
    } catch (e) {
      console.error('Failed to load favorite movies:', e);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
      setFavoriteMovies(updatedFavorites);

      // Update AsyncStorage with new favorite IDs list
      const favoriteIds = updatedFavorites.map((m) => m.id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Error removing favorite:', e);
    }
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        📆 {item.release_date?.slice(0, 7)} ⭐ {Math.round(item.vote_average * 10) / 10}
      </Text>

      {/* Trash button to remove from favorites */}
      <TouchableOpacity
        onPress={() => removeFavorite(item.id)}
        style={styles.removeButton}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;
  }

  if (favoriteMovies.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>No favorite movies saved yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMovie}
      numColumns={2}
      contentContainerStyle={styles.movieList}
    />
  );
}

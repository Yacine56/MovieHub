import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../styles/MovieDetailStyles';

const API_KEY = 'c303323de4763e483da75371e01f1bb6';

export default function MovieDetailScreen({ route }) {
  const { movie } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error('Error fetching details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !details) {
    return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.meta}>
        📆 {details.release_date?.slice(0, 7)} ⭐ {Math.round(details.vote_average * 10) / 10}
      </Text>
      <Text style={styles.meta}>
        🎭 {details.genres.map((g) => g.name).join(', ')} ⏱ {details.runtime} min
      </Text>
      <Text style={styles.overview}>{details.overview}</Text>
    </ScrollView>
  );
}

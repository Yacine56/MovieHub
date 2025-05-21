import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyles';

const API_KEY = 'c303323de4763e483da75371e01f1bb6';

const categories = {
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
  now_playing: 'Now Playing',
};

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, selectedCategory);
  }, [selectedCategory]);

  const fetchMovies = async (pageToFetch, category) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${pageToFetch}`
      );
      const data = await res.json();

      if (pageToFetch === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }

      if (data.page >= data.total_pages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, selectedCategory);
    }
  };

  const renderFooter = () => {
    if (!loading || page === 1) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
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
        📆 {item.release_date?.slice(0, 4)} ⭐ {Math.round(item.vote_average * 10) / 10}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sticky filter bar */}
      <View style={styles.filterBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}
        >
          {Object.keys(categories).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedCategory(key)}
              style={[
                styles.filterButton,
                selectedCategory === key ? styles.filterButtonActive : null,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === key ? styles.filterTextActive : null,
                ]}
              >
                {categories[key]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollable movie list */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

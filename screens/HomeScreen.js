import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const searchTimeout = useRef(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (searchQuery) return;
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, selectedCategory, selectedGenre);
  }, [selectedCategory, selectedGenre]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!searchQuery) {
      // Reset to default Popular movies when search is cleared
      setSelectedCategory('popular');
      setSelectedGenre(null);
      setMovies([]);
      setPage(1);
      setHasMore(true);
      fetchMovies(1, 'popular', null);
      return;
    }

    searchTimeout.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);
  }, [searchQuery]);

  const fetchGenres = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (err) {
      console.error('Failed to load genres:', err);
    }
  };

  const fetchMovies = async (pageToFetch, category, genreId) => {
    setLoading(true);
    try {
      let url;

      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageToFetch}&with_genres=${genreId}&sort_by=${mapCategoryToSort(category)}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${pageToFetch}`;
      }

      const res = await fetch(url);
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

  const mapCategoryToSort = (category) => {
    switch (category) {
      case 'top_rated':
        return 'vote_average.desc';
      case 'upcoming':
        return 'release_date.asc';
      case 'now_playing':
        return 'release_date.desc';
      case 'popular':
      default:
        return 'popularity.desc';
    }
  };

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data.results || []);
      setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !searchQuery) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, selectedCategory, selectedGenre);
    }
  };

  const renderFooter = () => {
    if (!loading || page === 1) return null;
    return (
      <View style={styles.footer}>
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
        📆 {item.release_date?.slice(0, 7)} ⭐ {Math.round(item.vote_average * 10) / 10}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => {
            Keyboard.dismiss();
            handleSearch(searchQuery);
          }}
        />
      </View>

      {/* 🎞️ Category Filter */}
      {!searchQuery && (
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
      )}

      {/* 🎭 Genre Dropdown */}
      {!searchQuery && (
        <View style={styles.genrePickerWrapper}>
          <Picker
            selectedValue={selectedGenre}
            onValueChange={(itemValue) => setSelectedGenre(itemValue)}
            style={styles.genrePicker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Select Genre..." value={null} color="#aaa" />
            {genres.map((genre) => (
              <Picker.Item key={genre.id} label={genre.name} value={genre.id} color="#fff" />
            ))}
          </Picker>
        </View>
      )}

      {/* 🎬 Movie Grid */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={2}
          contentContainerStyle={styles.movieList}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

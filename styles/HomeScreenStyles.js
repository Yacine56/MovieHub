import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  searchWrapper: {
    paddingHorizontal: 10,
    marginTop: 10,
  },

  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },

  genrePickerWrapper: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  genrePicker: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
  },

  filterBarWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },

  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#333',
  },

  filterButtonActive: {
    backgroundColor: '#e50914',
  },

  filterText: {
    color: '#ccc',
    fontSize: 14,
  },

  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },

  poster: {
    width: '100%',
    height: 330,
  },

  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 6,
    paddingHorizontal: 6,
  },

  meta: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 8,
    paddingHorizontal: 6,
  },

  footer: {
    paddingVertical: 20,
  },

  loadingIndicator: {
    marginTop: 20,
  },

  movieList: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  genrePickerWrapper: {
  marginHorizontal: 10,
  marginBottom: 20,
  borderRadius: 8,
  backgroundColor: '#222',
  overflow: 'hidden',
},

genrePicker: {
  color: '#fff',
  height: 44,
},
});

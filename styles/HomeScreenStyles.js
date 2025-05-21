import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  filterBarWrapper: {
    backgroundColor: '#000',
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 20,
    zIndex: 100,
  },

  filterBar: {
    paddingHorizontal: 4,
    flexDirection: 'row',
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#222',
    borderRadius: 999,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
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
    height: 250,
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
});

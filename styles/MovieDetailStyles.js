import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    padding: 20,
  },

  poster: {
    width: '100%',
    height: 650,
    borderRadius: 10,
    marginBottom: 16,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  meta: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 12,
  },

  overview: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
  },
});

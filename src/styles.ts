import { StyleSheet } from 'react-native';

const light = StyleSheet.create({
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 24,
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  selectorText: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#444',
    marginVertical: 4,
  },
  selectedInMultiHighlight: {
    backgroundColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginVertical: 2,
  },
  arrow: {
    width: 28,
    position: 'absolute',
    right: 0,
    paddingBottom: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    right: 5,
  },
  clearIcon: {
    alignSelf: 'center',
    fontSize: 26,
    color: 'black',
  },
  searchBox: {
    paddingHorizontal: 8,
    height: 40,
    borderWidth: 1,
    margin: 8,
  },
  list: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    paddingLeft: 8,
    color: '#444',
  },
  itemSelected: {
    backgroundColor: 'lightblue',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
  },
});

const dark = StyleSheet.create({
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 24,
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 5,
    backgroundColor: '#444',
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  selectorText: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#ddd',
    marginVertical: 4,
  },
  selectedInMultiHighlight: {
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginVertical: 2,
  },
  arrow: {
    width: 28,
    position: 'absolute',
    right: 0,
    paddingBottom: 4,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    width: 40,
    height: 40,
    backgroundColor: '#444',
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    right: 5,
  },
  clearIcon: {
    alignSelf: 'center',
    fontSize: 26,
    color: 'white',
  },
  searchBox: {
    paddingHorizontal: 8,
    height: 40,
    borderWidth: 1,
    margin: 8,
  },
  list: {
    position: 'absolute',
    backgroundColor: '#444',
    borderColor: 'black',
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    paddingLeft: 8,
    color: '#ddd',
  },
  itemSelected: {
    backgroundColor: 'teal',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
  },
});

const styles = [light, dark];

export default styles;

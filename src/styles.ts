import { StyleSheet } from 'react-native';

const light = StyleSheet.create({
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 2,
    height: 40,
    margin: 5,
    backgroundColor: 'white',
  },
  selectorText: {
    fontSize: 16,
    paddingLeft: 8,
    overflow: 'hidden',
    paddingRight: 20,
    color: '#444',
  },
  arrow: {
    position: 'absolute',
    right: 12,
    top: 6,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: 'white',
    flexGrow: 0,
    marginHorizontal: 5,
    borderColor: '#ddd',
    borderWidth: 0.5,
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
    borderColor: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 2,
    height: 40,
    margin: 5,
    backgroundColor: '#444',
  },
  selectorText: {
    fontSize: 16,
    paddingLeft: 8,
    overflow: 'hidden',
    paddingRight: 20,
    color: '#ddd',
  },
  arrow: {
    position: 'absolute',
    right: 12,
    top: 6,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: '#444',
    flexGrow: 0,
    marginHorizontal: 5,
    borderColor: 'black',
    borderWidth: 0.5,
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

const styles = [light, dark]

export default styles;
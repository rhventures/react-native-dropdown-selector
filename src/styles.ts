import { StyleSheet } from 'react-native';

const light = StyleSheet.create({
  selectorBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    height: 40,
    margin: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  selectorText: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#444',
  },
  selectedInMultiHighlight: {
    backgroundColor: '#ccc',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  selectedInMulti: {
    fontSize: 16,
    color: 'black',
  },
  arrow: {
    width: 40,
    height: 28,
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    top: 6,
    paddingLeft: 12,
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
    paddingHorizontal: 8,
    height: 40,
    margin: 5,
    backgroundColor: '#444',
    overflow: 'hidden',
  },
  selectorText: {
    fontSize: 16,
    overflow: 'hidden',
    color: '#ddd',
  },
  selectedInMultiHighlight: {
    backgroundColor: '#222',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  selectedInMulti: {
    fontSize: 16,
    color: '#ddd',
  },
  arrow: {
    width: 40,
    height: 28,
    backgroundColor: '#444',
    position: 'absolute',
    right: 0,
    top: 6,
    paddingLeft: 12,
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
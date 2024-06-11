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
    width: 40,
    backgroundColor: '#fff8',
    position: 'absolute',
    right: 0,
    paddingLeft: 12,
    paddingBottom: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 999,
  },
  list: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderColor: 'black',
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
    alignContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 8,
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
    width: 40,
    backgroundColor: '#4448',
    position: 'absolute',
    right: 0,
    paddingLeft: 12,
    paddingBottom: 4,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 999,
  },
  list: {
    backgroundColor: '#444',
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
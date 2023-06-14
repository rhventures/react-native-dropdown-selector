import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    paddingLeft: 2,
  },
  arrow: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    position: 'absolute',
    right: 5,
  },
  arrowListDisplayed: {
    transform: [{ rotate: '180deg' }],
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
    paddingLeft: 5,
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

export default styles;

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F20',
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },
  icon: {
    width: 200,
    height: 200,
  },
  appNameText: {
    // fontFamily: 'Open Sans',
    color: '#04C37D',
  },
  input: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  containerInputs: {
    flex: 2,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  inputText: {
    color: '#8C8A8C'
  }
});

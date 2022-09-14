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
    marginTop: 20,
  },
  backIcon: {
    color: '#fff',
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  containerInputs: {
    flex: 6,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#211F20',
  },
  activityIndicator: {
    marginVertical: 30,
  },
});

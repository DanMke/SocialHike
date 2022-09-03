import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F20',
  },
  containerIcon: {
    flex: 1,
    marginBottom: 20,
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
  },
  feedElement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    height: 80,
    width: '100%',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    borderRightColor: '#fff',
    borderRightWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
  feedElementText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  feedElementDetailsTextDark: {
    color: '#8C8A8C',
    fontSize: 14,
  },
  feedElementDetailsText: {
    color: '#fff',
    fontSize: 14,
  },
  followElement: {
    color: '#fff',
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

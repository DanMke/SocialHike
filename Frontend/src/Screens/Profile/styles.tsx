import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F20',
  },
  containerIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    color: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  profile: {
    backgroundColor: '#333333',
    height: 200,
    marginTop: 20,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  profileUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileUserDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileUserDetailsTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  feedElementUserText: {
    color: '#fff',
    paddingLeft: 10,
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
  activity: {
    backgroundColor: '#333333',
    height: 360,
    marginTop: 20,
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  activityIndicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

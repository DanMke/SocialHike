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
    backgroundColor: '#333333',
    minHeight: 1200,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  feedElementMap: {
    width: '100%',
    height: '30%',
  },
  feedElementUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  feedElementInfo: {
    flexDirection: 'column',
  },
  feedElementUserText: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
  },
  feedElementUserActivityType: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
  },
  feedElementDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  feedElementDetailsTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  feedElementDetailsText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  feedElementDetailsTextDark: {
    color: '#8C8A8C',
    fontSize: 14,
  },
  feedElementDetailsTextWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  feedElementReacts: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  feedElementReactLike: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15573E',
  },
  feedElementReactComment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04AA6C',
  },
  routeElevation: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  routeDetails: {
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'space-around',
  },
});

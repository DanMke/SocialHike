import {Dimensions, StyleSheet} from 'react-native';

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
  feed: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  feedElement: {
    backgroundColor: '#333333',
    minHeight: 270,
    // borderRadius: 10,
    marginVertical: 5,
  },
  feedElementMap: {
    width: '100%',
    height: '55%',
  },
  feedElementUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  feedElementUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  indicatorWrapper: {
    height: Dimensions.get('screen').height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

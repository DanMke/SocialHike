import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F20',
  },
  externalView: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  routes: {
    width: '100%',
    height: '100%',
    borderTopWidth: 4,
    borderTopColor: '#8C8A8C',
  },
  routeElement: {
    flexDirection: 'column',
    height: 120,
    width: '100%',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8C8A8C',
  },
  routeElementText: {
    color: '#ffffff',
    fontSize: 16,
  },
  routeElementTextDark: {
    color: '#8C8A8C',
    fontSize: 14,
  },
  routeElementTextValue: {
    color: '#ffffff',
    fontSize: 14,
  },
  routeElementTextKM: {
    color: '#ffffff',
    fontSize: 14,
    paddingLeft: 5,
  },
  routeElementTextWithImage: {
    color: '#ffffff',
    fontSize: 16,
    flexDirection: 'row',
  },
  routeDetails: {
    flexDirection: 'row',
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  routeElevation: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeDistance: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingRight: 20,
  },
});

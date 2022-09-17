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
    minHeight: 100,
    width: '100%',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8C8A8C',
  },
  routeElementSelected: {
    backgroundColor: '#4c484a',
  },
  routeElementUnselected: {
    backgroundColor: '#211F20',
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
    alignItems: 'center',
    width: '100%',
  },
  routeElevation: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeDistance: {
    flexDirection: 'column',
    paddingRight: 20,
    alignItems: 'center',
  },
  noActivityWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingWrapper: {
    marginTop: 20,
  },
});

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F20',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.5,
  },
});

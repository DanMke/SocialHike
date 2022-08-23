import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Image,
  Button
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

interface SocialProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Social: React.FC<SocialProps> = ({onTest, user, navigation}: SocialProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={styles.containerIcon}>
            <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
              <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                <ArrowBackIcon size="xl" color="#ffffff" />
              </VStack>
            </Pressable>
          </View>
          <View>
            <View style={styles.feedElement}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image width={12} height={12} borderRadius={100} source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" />
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text style={styles.feedElementDetailsTextDark}>@danielmaike</Text>
                  <Text style={styles.feedElementText}>Daniel Maike</Text>
                </View>
              </View>
              <Button backgroundColor={"#04AA6C"} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Follow</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store: any) => {
  return {
    user: store.user.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTest: () => dispatch(updateUser({name: 'Jobs'})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Social);

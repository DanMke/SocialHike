import {
  ScrollView,
  View,
  Text,
  Pressable,
  VStack,
  ArrowBackIcon,
  Image,
  Button,
  Input,
  Icon,
} from 'native-base';
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {updateUser} from '../../Redux/actions';

import styles from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface SocialProps {
  onTest?: any;
  user: any;
  navigation: any;
}

const Social: React.FC<SocialProps> = ({onTest, user, navigation}: SocialProps) => {

  // TODO useEffect pegando os usuarios com logica de sort por relacionamento

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
          <View style={styles.containerIcon}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
              <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
                <VStack width={50} height={50} bgColor={"#333333"} space={4} alignItems="center" justifyContent={"center"} borderRadius="10">
                  <ArrowBackIcon size="xl" color="#ffffff" />
                </VStack>
              </Pressable>
              <VStack w="80%" space={5} alignSelf="center">
                <Input
                    placeholder="Search users"
                    type="text"
                    selectionColor={'#15573E'}
                    size="md"
                    _focus={{borderColor: '#15573E'}}
                    color={'#E9E8E8'}
                    variant="outline"
                    borderColor={'#04C37D'}
                    InputLeftElement={<Icon size="5" color="gray.400" as={<FontAwesomeIcon style={{marginHorizontal: 10}}  icon={faSearch} size={20} color="#ffffff"/>} />}
                    // onChangeText={value => setUsername(value)}
                  />
              </VStack>
            </View>
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

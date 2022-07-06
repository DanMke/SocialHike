import {
    Input,
    Text,
    VStack,
    FormControl,
    Button,
    WarningOutlineIcon,
    Link,
  } from 'native-base';
import React from 'react';
import {View, SafeAreaView, Image, ScrollView} from 'react-native';

import styles from './styles';

import SocialHikeIcon from '../../../assets/socialhikeicon.png';

interface RegisterProps {
  navigation: any;
}

const Register: React.FC<RegisterProps> = ({navigation}: RegisterProps) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  
  const onCreateAnAccount = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.containerIcon}>
          <Image source={SocialHikeIcon} style={styles.icon} />
        </View>
        <View style={styles.containerInputs}>
          <VStack width="90%" mx="3" maxW="300px">
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="0">Email</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Password</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Confirm Password</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">First Name</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Last Name</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Weight</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                rightIcon={<WarningOutlineIcon size="xs" />}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label _text={{fontSize: 'md', color: '#8C8A8C'}} mt="3">Height</FormControl.Label>
              <Input
                placeholder=""
                type="text"
                keyboardType='numeric'
                selectionColor={'#15573E'}
                size="md"
                _focus={{borderColor: '#15573E'}}
                color={'#E9E8E8'}
                variant="underlined"
                borderColor={'#04C37D'}
                // onChangeText={value => setPassword(value)}
              />
            </FormControl>
            <Button
              onPress={onCreateAnAccount}
              mt="8"
              _text={{fontWeight: 'bold', fontSize: 'md', color: '#E9E8E8'}}
              backgroundColor={'#15573E'}
              paddingTop={5}
              paddingBottom={5}
              borderRadius={10}
              mb={10}>
              Create An Account
            </Button>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

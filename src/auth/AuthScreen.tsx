import React, {useEffect} from 'react';
import styles from '../main/MainStyle';
import {View, Text} from 'react-native';
import {apolloClient} from '../api';
import {LOG_IN_WITH_EMAIL} from '../globalGraphql';
import {FetchResult} from 'apollo-boost';
import {getToken, saveToken} from '../utils/localStorage';
import {useNavigation} from '@react-navigation/native';

interface LoginWithEmail {
  loginWithEmail?: UserInfo;
}

interface UserInfo {
  accessToken: string;
  refreshToken: string;
}

const AuthScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    logInWithEmailAction();
  }, []);

  const logInWithEmailAction = async () => {
    try {
      const result: FetchResult<LoginWithEmail> = await apolloClient.mutate({
        mutation: LOG_IN_WITH_EMAIL,
        variables: {email: 'john@doe.com', password: 'p4SSW0rd'},
      });
      const accessToken = result.data?.loginWithEmail?.accessToken ?? '';
      saveToken(accessToken);
      navigation.navigate('CardListScreen', {});
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Text>{'Authentication'}</Text>
    </View>
  );
};
export default AuthScreen;

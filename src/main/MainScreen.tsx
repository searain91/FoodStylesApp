import React, {useEffect} from 'react';
import styles from './MainStyle';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CardListScreen from '../cardList/views/CardListScreen';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {clearNetworkFail} from '../actions';
import {NetworkState} from '../reducers';
import {apolloClient} from '../api';
import {LOG_IN_WITH_EMAIL} from '../globalGraphql';
import {FetchResult} from 'apollo-boost';
import {getToken, saveToken} from '../utils/localStorage';

const Stack = createStackNavigator();

interface LoginWithEmail {
  loginWithEmail?: UserInfo;
}

interface UserInfo {
  accessToken: string;
  refreshToken: string;
}

const MainScreen = () => {
  const sendNetworkFail = useSelector((state: NetworkState) => {
    return state;
  });
  const dispatch = useDispatch();
  const clearNetworkStatus = () => dispatch(clearNetworkFail());

  useEffect(() => {
    logInWithEmailAction();
  }, []);

  const logInWithEmailAction = async () => {
    try {
      const token = await getToken();
      if (!token) {
        const result: FetchResult<LoginWithEmail> = await apolloClient.mutate({
          mutation: LOG_IN_WITH_EMAIL,
          variables: {email: 'john@doe.com', password: 'p4SSW0rd'},
        });
        const accessToken = result.data?.loginWithEmail?.accessToken ?? '';
        saveToken(accessToken);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (sendNetworkFail.err) {
    switch (sendNetworkFail.err) {
      case 'NETWORK_ERROR':
        Toast.show('No network connection, please try again');
        break;
      case 'TIMEOUT_ERROR':
        Toast.show('Timeout, please try again');
        break;
      case 'CONNECTION_ERROR':
        Toast.show('DNS server not found, please try again');
        break;
      default:
        Toast.show(sendNetworkFail.err);
        break;
    }
    clearNetworkStatus();
  }

  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CardListScreen">
          <Stack.Screen
            name="CardListScreen"
            component={CardListScreen}
            options={{
              gestureEnabled: true,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default MainScreen;

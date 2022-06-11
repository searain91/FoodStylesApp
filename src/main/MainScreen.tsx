import React from 'react';
import styles from './MainStyle';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CardListScreen from '../cardList/views/CardListScreen';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {clearNetworkFail} from '../actions';
import {NetworkState} from '../reducers';
import AuthScreen from '../auth/AuthScreen';

const Stack = createStackNavigator();

const MainScreen = () => {
  const sendNetworkFail = useSelector((state: NetworkState) => {
    return state;
  });
  const dispatch = useDispatch();
  const clearNetworkStatus = () => dispatch(clearNetworkFail());

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
        <Stack.Navigator initialRouteName="AuthScreen">
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{
              gestureEnabled: true,
              headerShown: false,
            }}
          />
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

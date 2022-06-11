import AsyncStorage from '@react-native-community/async-storage';
import {ACCESS_TOKEN} from '../const';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  } catch (error) {
    console.log('error', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    return token;
  } catch (error) {
    console.log('error', error);
  }
};

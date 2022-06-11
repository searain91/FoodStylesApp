import {Platform} from 'react-native';
export const Fonts = {
  fontRegular: Platform.select({
    ios: 'ProximaNova-Regular',
    android: 'ProximaNovaAlt-Regular',
  }),
  fontBold: Platform.select({
    ios: 'ProximaNova-Bold',
    android: 'ProximaNovaAlt-Bold',
  }),
};

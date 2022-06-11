import {StyleSheet} from 'react-native';
import ApplicationStyle from '../../Themes/Application.Style';
import colors from '../../Themes/Colors';
import {Fonts} from '../../Themes/Fonts';

export default StyleSheet.create({
  ...ApplicationStyle,
  borderView: {
    height: 52,
    marginHorizontal: 18,
    paddingHorizontal: 18,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerView: {
    height: 157,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  leftImage: {
    marginLeft: 19,
    marginTop: 39,
  },
  cardName: {
    fontSize: 18,
    marginRight: 8,
    flex: 1,
    fontFamily: Fonts.fontBold,
  },
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  flatList: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 90,
    bottom: 110,
  },
  buttonAddCard: {
    marginHorizontal: 18,
    paddingHorizontal: 18,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.white,
  },
  blueView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  animatedView: {
    position: 'absolute',
    width: '100%',
  },
  animatedOptions: {
    alignItems: 'flex-end',
    paddingRight: 20,
    alignSelf: 'flex-end',
    paddingTop: 5,
  },
  text: {
    color: colors.green,
    fontSize: 15,
    fontFamily: Fonts.fontRegular,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

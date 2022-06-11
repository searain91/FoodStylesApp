import React, {useEffect, useRef} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Share,
  Alert,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalState} from '../../reducers';
import styles from './CardListStyle';
import {images} from '../../assets/images';
import CardItem from './CardItem';
import {
  closeCardOptions,
  deleteCardRequest,
  duplicateCardRequest,
} from '../src/cardListActions';
import {shareCardApi} from '../../api';
import {shareUrl} from '../../const';
import {FetchResult} from 'apollo-boost';

export const CardOptions = () => {
  const cardItem = useSelector(
    (state: GlobalState) => state.getCardListResponse.cardOption.card,
  );
  const offset = useSelector(
    (state: GlobalState) => state.getCardListResponse.cardOption.offset,
  );
  const top = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {height} = useWindowDimensions();

  useEffect(() => {
    if (offset > 0) {
      Animated.timing(top, {
        toValue: offset,
        useNativeDriver: false,
        duration: 0,
      }).start(() => {
        Animated.timing(top, {
          toValue: height / 4,
          useNativeDriver: false,
          duration: 400,
        }).start(() => {});
      });
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: false,
        duration: 400,
      }).start();
    }
  }, [height, offset, scale, top]);

  const closeBlurView = () => {
    Animated.timing(scale, {
      toValue: 0,
      useNativeDriver: false,
      duration: 400,
    }).start();
    Animated.timing(top, {
      toValue: offset,
      useNativeDriver: false,
      duration: 400,
    }).start(() => dispatch(closeCardOptions()));
  };

  const shareAction = async () => {
    try {
      closeBlurView();
      const code: FetchResult<cardList.ShareCard> = await shareCardApi(
        cardItem.id,
      );
      Share.share({
        message: cardItem.name,
        url: `${shareUrl}/${code.data?.shareCard}`,
      });
    } catch (e) {
      Alert.alert('Error', 'Please try again!');
    }
  };

  const duplicateAction = async () => {
    closeBlurView();
    dispatch(duplicateCardRequest(cardItem.id));
  };

  const deleteCardAction = async () => {
    Alert.alert(
      'Confirm delete',
      'This will delete the Food Style and all its settings.',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            closeBlurView();
            dispatch(deleteCardRequest(cardItem.id));
          },
        },
        {text: 'Cancel'},
      ],
    );
  };

  return cardItem && offset > 0 ? (
    <BlurView style={styles.blueView} blurType="light" blurAmount={20}>
      <Animated.View style={[styles.animatedView, {top}]}>
        <CardItem
          item={cardItem}
          onPress={closeBlurView}
          rightImage={images.close}
        />
        <Animated.View
          style={[
            styles.animatedOptions,
            {transform: [{scaleX: scale}, {scaleY: scale}]},
          ]}>
          <TouchableOpacity style={styles.button} onPress={shareAction}>
            <Text style={styles.text}>{'Share'}</Text>
            <Image source={images.share} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={duplicateAction}>
            <Text style={styles.text}>{'Duplicate'}</Text>
            <Image source={images.duplicate} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={deleteCardAction}>
            <Text style={styles.text}>{'Delete'}</Text>
            <Image source={images.delete} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </BlurView>
  ) : null;
};

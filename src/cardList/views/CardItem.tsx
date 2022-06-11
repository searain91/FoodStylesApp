import React, {useRef} from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from 'react-native';
import {showCardOptions} from '../src/cardListActions';
import {useDispatch} from 'react-redux';
import styles from './CardListStyle';
import {images} from '../../assets/images';

interface CardItemProps {
  item: cardList.CardItem;
  rightImage?: ImageSourcePropType;
  onPress?: () => void;
}

const CardItem = (props: CardItemProps) => {
  const dispatch = useDispatch();
  const {item, onPress, rightImage} = props;
  const viewRef = useRef<{view: View | null}>({view: null}).current;

  const showCardOption = () => {
    viewRef.view?.measure((fx, fy, w, h, px, py) => {
      dispatch(showCardOptions(item, py));
    });
  };

  return (
    <View style={styles.borderView} ref={e => (viewRef.view = e)}>
      <Text style={styles.cardName}>{item.name}</Text>
      <TouchableOpacity onPress={onPress || showCardOption}>
        <Image source={rightImage || images.options} />
      </TouchableOpacity>
    </View>
  );
};

export default CardItem;

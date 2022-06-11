import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  View,
  Image,
  StatusBar,
  ListRenderItem,
  Text,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {getListCardRequest, addCardRequest} from '../src/cardListActions';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalState} from '../../reducers';
import styles from './CardListStyle';
import {CardOptions} from './CardOptions';
import CardItem from './CardItem';

const CardListScreen = () => {
  const listCardData = useSelector(
    (state: GlobalState) => state.getCardListResponse,
  );
  const flatListRef = useRef<FlatList<any>>(null);
  const dispatch = useDispatch();
  const createCard = () => {
    const random = Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
    dispatch(addCardRequest(`Food style ${random}`));
  };

  useEffect(() => {
    dispatch(getListCardRequest());
  }, [dispatch]);

  const renderHeaderView = () => {
    return (
      <LinearGradient
        style={styles.headerView}
        colors={['#FA7745', '#F3C442']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Image style={styles.leftImage} source={images.logo} />
      </LinearGradient>
    );
  };

  const keyExtractor = (item: cardList.CardItem, index: number) => {
    return `${item.id}-${index}`;
  };

  const renderItem: ListRenderItem<cardList.CardItem> = ({item}) => {
    return <CardItem item={item} rightImage={images.options} />;
  };

  return (
    <View style={styles.containerView}>
      <StatusBar barStyle="light-content" />
      {renderHeaderView()}
      <FlatList
        style={styles.flatList}
        data={listCardData.cardList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      <TouchableOpacity style={styles.buttonAddCard} onPress={createCard}>
        <Image source={images.add} />
        <Text style={styles.cardName}>{'New Food Style'}</Text>
      </TouchableOpacity>
      <CardOptions />
    </View>
  );
};

export default CardListScreen;

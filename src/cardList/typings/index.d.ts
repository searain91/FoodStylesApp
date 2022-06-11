declare namespace cardList {
  interface State {
    cardList: CardItem[];
    cardOption: cardList.CardOption;
    err: any;
  }

  interface Card {
    cardList: Cards;
  }

  interface CardItem {
    id: string;
    name: string;
  }

  interface Cards {
    cards: CardItem[];
  }

  interface CreateCard {
    createCard: CardItem;
  }

  interface DuplicateCard {
    duplicateCard: CardItem;
  }

  interface DeleteCard {
    deleteCard: CardItem;
  }

  interface CardOption {
    card: CardItem;
    offset: number;
  }

  interface ShareCard {
    shareCard: string;
  }
}

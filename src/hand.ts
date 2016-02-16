module Blackjack {
  export class Hand {
    constructor(public cards: Card[] = []) {}

    protected findOptimalValue(cards: Card[], value: number = 0) {
      let copyOfCards = _.merge([], cards);
      let values: number[] = [];
      let card: Card = copyOfCards.shift();

      if(card) {
        if(card.name === CardName.Ace) {
          _.merge(values, this.findOptimalValue(copyOfCards, 11));
        }

        _.merge(values, this.findOptimalValue(copyOfCards, card.numericValue));
      }

      let optimalValue = 0;
      values.forEach((value) => {
        if(value > optimalValue && value < 22) {
          optimalValue = value;
        }
      });

      return optimalValue || values[0];
    }

    public getValue() {
      return this.findOptimalValue(this.cards);
    }
  }
}

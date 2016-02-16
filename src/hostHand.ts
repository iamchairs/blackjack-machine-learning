module Blackjack {
  export class HostHand extends Hand {
    constructor(public cards: Card[] = []) {
      super(cards);
    }

    public getPublicCards() {
      let publicCards: Card[] = [];
      this.cards.forEach((card) => {
        if(!card.hidden) {
          publicCards.push(card);
        }
      });

      return publicCards;
    }

    public getValue(): number {
      return this.findOptimalValue(this.getPublicCards());
    }

    public getPrivateValue(): number {
      return this.findOptimalValue(this.cards);
    }
  }
}

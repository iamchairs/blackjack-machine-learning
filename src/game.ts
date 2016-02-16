module Blackjack {
  export class Game {
    public host: Host;

    public players: Player[] = [];

    public hand: Hand;

    public decksInHand: number = 1;

    public highCardsSeen = 0;

    public cardsDealt = 0;

    construtor() {
      this.host = new Host();
    }

    private burn() {
      this.hand.cards.unshift();
      this.cardsDealt += 1;
    }

    public play() {
      this.burn();

      let cards = this.deal();
      this.cardsDealt += cards.length;

      // Once cards are dealt, if the host has a high card or Ace the host
      // needs to check for Blackjack.
      //
      // If the host has blackjack everyone loses. Otherwise, play as normal.

      let hostHasBlackjack = false;
      if(cards[1].numericValue === 10 || cards[1].name === CardName.Ace) {
        hostHasBlackjack = this.host.hand.getPrivateValue() === 21;
      }

      if(hostHasBlackjack) {
        // Host has blackjack.
        // Everyone loses.
        // Don't unshift the first card because we can count all of them now.
        this.hostWins();
      } else {
        // Remove the first card as it's a hidden host card
        cards.unshift();
      }

      this.countHighCards(cards);
      this.playNextPlayer();
    }

    public playNextPlayer() {
      let foundPlayerToPlay = false;
      this.players.forEach((player) => {
        if(player.status === PlayerStatus.Waiting) {
          foundPlayerToPlay = true;
          this.playPlayer(player).then(() => {
            this.playNextPlayer();
          });
        }
      });

      if(!foundPlayerToPlay) {

      }
    }

    public playPlayer(player: Player): Promise<any> {
      let defer = new Promise((resolve) => {

      });

      return defer;
    }

    public hostWins() {

    }

    /**
     * Counts the number of high cards seen in the the given array of Card
     * @param  {Card[]} cards
     */
    public countHighCards(cards: Card[]) {
      cards.forEach((card) => {
        if(card.numericValue > 9) {
          this.highCardsSeen += 1;
        }
      });
    }

    /**
     * Deals the host and each player 2 cards.
     * The first host card will be hidden.
     * The dealt cards (including the hidden card) will be returned.
     *
     * @return {Card[]} [description]
     */
    public deal(): Card[] {
      // +1 for host
      let numPlayers = this.players.length + 1;
      let cardsDealt = this.hand.cards.splice(0, numPlayers*2);
      let cardsToDeal = _.merge([], cardsDealt);

      this.host.hand.cards = cardsToDeal.splice(0, 2);
      this.host.hand.cards[0].hidden = true;

      this.players.forEach((player) => {
        player.hand.cards = cardsToDeal.splice(0, 2);
      });

      return cardsDealt;
    }

    public shuffle() {

    }

    /**
     * Returns the ratio between VISIBLE high value cards (10, J, Q, K) and low
     * value cards. If you have 4 cards and only 1 of the cards is high value,
     * 0.25 will be returned.
     *
     * Only VISIBLE cards will be returned. If the dealer has a hidden card it
     * won't appear in this value. This assumes the eyes of a player.
     *
     * History between shuffles is accounted for. If shuffle occures every
     * 5 hands then the game will remember how many high cards have been played
     * between shuffles.
     *
     * If multiple decks are used, this will also be accounted for.
     *
     * @return {number} Ratio
     */
    public getHighValueRatio(): number {
      return 1;
    }
  }
}

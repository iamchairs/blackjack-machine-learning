module Blackjack {
  export class Host extends Player {
    hand: HostHand;

    constructor() {
      super();
      
      this.hand = new HostHand();
    }

    getNextPlayerAction(): Promise<PlayerAction> {
      let defer = new Promise((resolve) => {
        if(this.hand.getValue() < 17) {
          resolve(PlayerAction.Twist);
        } else {
          resolve(PlayerAction.Stick);
        }
      });

      return defer;
    }
  }
}

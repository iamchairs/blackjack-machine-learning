module Blackjack {
  export enum PlayerAction {Stick, Twist};
  export enum PlayerStatus {Waiting, Playing, Played};

  export class Player {
    hand: Hand;
    status: PlayerStatus = PlayerStatus.Waiting;

    constructor() {
      this.hand = new Hand();
    }

    getNextPlayerAction(game: Game): Promise<PlayerAction> {
      let defer = new Promise((resolve, reject) => {
        let handValue = this.hand.getValue();
        let highValueRatio = game.getHighValueRatio();
      });

      return defer;
    }
  }
}

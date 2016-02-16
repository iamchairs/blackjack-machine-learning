module Blackjack {
  export enum CardSuit {Spades, Hearts, Diamonds, Clubs};
  export enum CardName {Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King};

  const nameToNumeric = {
    [CardName.Ace]:   1,
    [CardName.Two]:   2,
    [CardName.Three]: 3,
    [CardName.Four]:  4,
    [CardName.Five]:  5,
    [CardName.Six]:   6,
    [CardName.Seven]: 7,
    [CardName.Eight]: 8,
    [CardName.Nine]:  9,
    [CardName.Ten]:   10,
    [CardName.Jack]:  10,
    [CardName.Queen]: 10,
    [CardName.King]:  10
  };

  export class Card {

    private _numericValue: number;

    private _name: CardName;

    public suit = CardSuit;

    public hidden: boolean = false;

    constructor(nm?: CardName) {
      this.name = nm;
    }

    public get numericValue(): number {
      return this._numericValue;
    }

    public get name(): CardName {
      return this._name;
    }

    public set name(nm: CardName) {
      this._name = nm;
      this._numericValue = nameToNumeric[nm];
    }
  }
}

import { v1 as uuidv1 } from 'uuid'
import { Card, CompareFn, Visibility } from './Card'
import CardSet from './CardSet'

/**
 * Values of standard playing cards represented as two characters, the first indicating suit, and the second indicating
 * rank.
 */
export enum Value {
  CA = 'CA',
  C2 = 'C2',
  C3 = 'C3',
  C4 = 'C4',
  C5 = 'C5',
  C6 = 'C6',
  C7 = 'C7',
  C8 = 'C8',
  C9 = 'C9',
  CT = 'CT',
  CJ = 'CJ',
  CQ = 'CQ',
  CK = 'CK',
  DA = 'DA',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4',
  D5 = 'D5',
  D6 = 'D6',
  D7 = 'D7',
  D8 = 'D8',
  D9 = 'D9',
  DT = 'DT',
  DJ = 'DJ',
  DQ = 'DQ',
  DK = 'DK',
  HA = 'HA',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  H7 = 'H7',
  H8 = 'H8',
  H9 = 'H9',
  HT = 'HT',
  HJ = 'HJ',
  HQ = 'HQ',
  HK = 'HK',
  SA = 'SA',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  S6 = 'S6',
  S7 = 'S7',
  S8 = 'S8',
  S9 = 'S9',
  ST = 'ST',
  SJ = 'SJ',
  SQ = 'SQ',
  SK = 'SK',
  J1 = 'J1',
  J2 = 'J2',
  J3 = 'J3',
  J4 = 'J4',
}

/** The suits of standard playing cards */
export enum Suit {
  None = 'None',
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
  Spades = 'Spades',
}

/** A map of playing card suit to unicode character  */
export const SuitCharacter: Record<Suit, string> = {
  [Suit.None]: '',
  [Suit.Clubs]: '♣',
  [Suit.Diamonds]: '♦',
  [Suit.Hearts]: '♥',
  [Suit.Spades]: '♠',
}

/** The ranks of standard playing cards */
export enum Rank {
  Ace = 'Ace',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Joker = 'Joker',
}

/** A map of playing card value to rank */
export const ValueRank: Record<Value, Rank> = {
  [Value.CA]: Rank.Ace,
  [Value.C2]: Rank.Two,
  [Value.C3]: Rank.Three,
  [Value.C4]: Rank.Four,
  [Value.C5]: Rank.Five,
  [Value.C6]: Rank.Six,
  [Value.C7]: Rank.Seven,
  [Value.C8]: Rank.Eight,
  [Value.C9]: Rank.Nine,
  [Value.CT]: Rank.Ten,
  [Value.CJ]: Rank.Jack,
  [Value.CQ]: Rank.Queen,
  [Value.CK]: Rank.King,
  [Value.DA]: Rank.Ace,
  [Value.D2]: Rank.Two,
  [Value.D3]: Rank.Three,
  [Value.D4]: Rank.Four,
  [Value.D5]: Rank.Five,
  [Value.D6]: Rank.Six,
  [Value.D7]: Rank.Seven,
  [Value.D8]: Rank.Eight,
  [Value.D9]: Rank.Nine,
  [Value.DT]: Rank.Ten,
  [Value.DJ]: Rank.Jack,
  [Value.DQ]: Rank.Queen,
  [Value.DK]: Rank.King,
  [Value.HA]: Rank.Ace,
  [Value.H2]: Rank.Two,
  [Value.H3]: Rank.Three,
  [Value.H4]: Rank.Four,
  [Value.H5]: Rank.Five,
  [Value.H6]: Rank.Six,
  [Value.H7]: Rank.Seven,
  [Value.H8]: Rank.Eight,
  [Value.H9]: Rank.Nine,
  [Value.HT]: Rank.Ten,
  [Value.HJ]: Rank.Jack,
  [Value.HQ]: Rank.Queen,
  [Value.HK]: Rank.King,
  [Value.SA]: Rank.Ace,
  [Value.S2]: Rank.Two,
  [Value.S3]: Rank.Three,
  [Value.S4]: Rank.Four,
  [Value.S5]: Rank.Five,
  [Value.S6]: Rank.Six,
  [Value.S7]: Rank.Seven,
  [Value.S8]: Rank.Eight,
  [Value.S9]: Rank.Nine,
  [Value.ST]: Rank.Ten,
  [Value.SJ]: Rank.Jack,
  [Value.SQ]: Rank.Queen,
  [Value.SK]: Rank.King,
  [Value.J1]: Rank.Joker,
  [Value.J2]: Rank.Joker,
  [Value.J3]: Rank.Joker,
  [Value.J4]: Rank.Joker,
}

/** A map of playing card value to suit */
export const ValueSuit: Record<Value, Suit> = {
  [Value.CA]: Suit.Clubs,
  [Value.C2]: Suit.Clubs,
  [Value.C3]: Suit.Clubs,
  [Value.C4]: Suit.Clubs,
  [Value.C5]: Suit.Clubs,
  [Value.C6]: Suit.Clubs,
  [Value.C7]: Suit.Clubs,
  [Value.C8]: Suit.Clubs,
  [Value.C9]: Suit.Clubs,
  [Value.CT]: Suit.Clubs,
  [Value.CJ]: Suit.Clubs,
  [Value.CQ]: Suit.Clubs,
  [Value.CK]: Suit.Clubs,
  [Value.DA]: Suit.Diamonds,
  [Value.D2]: Suit.Diamonds,
  [Value.D3]: Suit.Diamonds,
  [Value.D4]: Suit.Diamonds,
  [Value.D5]: Suit.Diamonds,
  [Value.D6]: Suit.Diamonds,
  [Value.D7]: Suit.Diamonds,
  [Value.D8]: Suit.Diamonds,
  [Value.D9]: Suit.Diamonds,
  [Value.DT]: Suit.Diamonds,
  [Value.DJ]: Suit.Diamonds,
  [Value.DQ]: Suit.Diamonds,
  [Value.DK]: Suit.Diamonds,
  [Value.HA]: Suit.Hearts,
  [Value.H2]: Suit.Hearts,
  [Value.H3]: Suit.Hearts,
  [Value.H4]: Suit.Hearts,
  [Value.H5]: Suit.Hearts,
  [Value.H6]: Suit.Hearts,
  [Value.H7]: Suit.Hearts,
  [Value.H8]: Suit.Hearts,
  [Value.H9]: Suit.Hearts,
  [Value.HT]: Suit.Hearts,
  [Value.HJ]: Suit.Hearts,
  [Value.HQ]: Suit.Hearts,
  [Value.HK]: Suit.Hearts,
  [Value.SA]: Suit.Spades,
  [Value.S2]: Suit.Spades,
  [Value.S3]: Suit.Spades,
  [Value.S4]: Suit.Spades,
  [Value.S5]: Suit.Spades,
  [Value.S6]: Suit.Spades,
  [Value.S7]: Suit.Spades,
  [Value.S8]: Suit.Spades,
  [Value.S9]: Suit.Spades,
  [Value.ST]: Suit.Spades,
  [Value.SJ]: Suit.Spades,
  [Value.SQ]: Suit.Spades,
  [Value.SK]: Suit.Spades,
  [Value.J1]: Suit.None,
  [Value.J2]: Suit.None,
  [Value.J3]: Suit.None,
  [Value.J4]: Suit.None,
}

/**
 * Types of common playing card decks, and a reference to jokers which are often treated differently per
 * game/variation
 */
export enum DeckType {
  Standard = 0,
  Jokers = 1 << 0,
}

/** A lookup up table of DeckType to an array of Value(s) */
export const DeckTables: Record<DeckType, Value[]> = {
  [DeckType.Standard]: [
    Value.CA,
    Value.C2,
    Value.C3,
    Value.C4,
    Value.C5,
    Value.C6,
    Value.C7,
    Value.C8,
    Value.C9,
    Value.CT,
    Value.CJ,
    Value.CQ,
    Value.CK,
    Value.DA,
    Value.D2,
    Value.D3,
    Value.D4,
    Value.D5,
    Value.D6,
    Value.D7,
    Value.D8,
    Value.D9,
    Value.DT,
    Value.DJ,
    Value.DQ,
    Value.DK,
    Value.HA,
    Value.H2,
    Value.H3,
    Value.H4,
    Value.H5,
    Value.H6,
    Value.H7,
    Value.H8,
    Value.H9,
    Value.HT,
    Value.HJ,
    Value.HQ,
    Value.HK,
    Value.SA,
    Value.S2,
    Value.S3,
    Value.S4,
    Value.S5,
    Value.S6,
    Value.S7,
    Value.S8,
    Value.S9,
    Value.ST,
    Value.SJ,
    Value.SQ,
    Value.SK,
  ],
  [DeckType.Jokers]: [Value.J1, Value.J2, Value.J3, Value.J4],
}

/**
 * An implementation of a standard playing card
 */
export class PlayingCard implements Card {
  /**
   * Produces a CardSet of PlayingCards in common configurations.
   * @param type The type of deck to return, type can be bitmasked together (e.g. DeckType.Standard | DeckType.Jokers)
   *             produce a combination of deck types. Defaults to a standard 52 card deck.
   * @return An instance of CardSet of PlayingCards
   */
  static Deck(type: DeckType = DeckType.Standard): CardSet<PlayingCard> {
    const deck = new CardSet<PlayingCard>()
    if (DeckType.Standard === (type & DeckType.Standard)) {
      for (const value of DeckTables[DeckType.Standard]) {
        const card = new PlayingCard(value as Value)
        deck.add(card)
      }
    }
    if (DeckType.Jokers === (type & DeckType.Jokers)) {
      for (const value of DeckTables[DeckType.Jokers]) {
        const card = new PlayingCard(value as Value)
        deck.add(card)
      }
    }
    return deck
  }

  /**
   * Function used to determine the order of the PlayingCards. It is expected to return
   * a negative value if the first PlayingCard is less than the second PlayingCard, zero if they're equal, and a
   * positive value otherwise.
   * @param first First PlayingCard to compare
   * @param second Second PlayingCard to compare
   */
  static compare: CompareFn<PlayingCard> = (
    first: PlayingCard,
    second: PlayingCard,
  ) => {
    const rankIdx = Object.keys(Rank)
    const idx1 = rankIdx.indexOf(first.rank)
    const idx2 = rankIdx.indexOf(second.rank)
    if (idx1 < idx2) {
      return -1
    }
    if (idx1 > idx2) {
      return 1
    }
    return 0
  }

  /** Unique identifier string as uuid v1 */
  uuid: string

  /** PlayingCard value represented two characters the first is the suit and the second the rank (Ace, Queen, etc.) */
  value: Value

  /** Value indicating the visibility of the card to those who do not own it */
  visibility: Visibility

  constructor(value: Value, visibility?: Visibility) {
    this.uuid = uuidv1()
    this.value = value
    this.visibility = visibility || Visibility.Private
  }

  /** The suit of the PlayingCard value */
  get suit() {
    return ValueSuit[this.value]
  }

  /** The rank of the PlayingCard value */
  get rank() {
    return ValueRank[this.value]
  }

  /** The unicode character of the suit of the PlayingCard value */
  get character() {
    return SuitCharacter[this.suit]
  }
}

export default PlayingCard

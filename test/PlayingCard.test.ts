import {
  PlayingCard,
  Visibility,
  Rank,
  Suit,
  Value,
  DeckType,
} from '../src/index'

import { validate as uuidValidate, NIL as NIL_UUID } from 'uuid'

describe('PlayingCard', () => {
  it('should create a card with the correct value', () => {
    const card = new PlayingCard(Value.CA)
    expect(card.suit).toBe(Suit.Clubs)
    expect(card.rank).toBe(Rank.Ace)
    expect(card.visibility).toBe(Visibility.Private)
    expect(card.uuid).not.toBe(NIL_UUID)
    expect(uuidValidate(card.uuid)).toBeTruthy()
  })
  
  it('should initialize with defined parameters and create the appropriate card', () => {
    const card = new PlayingCard(Value.DQ)
    expect(card.suit).toBe(Suit.Diamonds)
    expect(card.rank).toBe(Rank.Queen)
    expect(card.visibility).toBe(Visibility.Private)
  })
  
  it('should return the appropriate unicode character for the card character property ', () => {
    const card = new PlayingCard(Value.HJ)
    expect(card.character).toBe('♥')
  })
  
  it('should create a deck of standard cards from PlayingCard Deck class method', () => {
    const deck = PlayingCard.Deck()
    expect(deck).not.toBe(undefined)
    expect(deck.count).toBe(52)
  })

  it('should be able to create a deck of just jokers', () => {
    const deck = PlayingCard.Deck(DeckType.Jokers)
    expect(deck).not.toBe(undefined)
    expect(deck.count).toBe(4)
    expect(deck.cards.some((card) => card.rank === Rank.Joker)).toBeTruthy()
  })
  
  it('should be able to create a deck of standard cards with jokers', () => {
    const type = DeckType.Standard | DeckType.Jokers
    const deck = PlayingCard.Deck(type)
    expect(deck).not.toBe(undefined)
    expect(deck.count).toBe(56)
    expect(deck.cards.some((card) => card.rank === Rank.Joker)).toBeTruthy()
  })
})



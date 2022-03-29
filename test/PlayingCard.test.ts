import {
  PlayingCard,
  Visibility,
  Rank,
  Suit,
  Value,
  DeckType,
} from '../src/index'

import { validate as uuidValidate, NIL as NIL_UUID } from 'uuid'

test('PlayingCard initializes with appropriate default values', () => {
  const card = new PlayingCard(Value.CA)
  expect(card.suit).toBe(Suit.Clubs)
  expect(card.rank).toBe(Rank.Ace)
  expect(card.visibility).toBe(Visibility.Private)
  expect(card.uuid).not.toBe(NIL_UUID)
  expect(uuidValidate(card.uuid)).toBeTruthy()
})

test('PlayingCard initializes with defined parameters will create the appropriate card', () => {
  const card = new PlayingCard(Value.DQ)
  expect(card.suit).toBe(Suit.Diamonds)
  expect(card.rank).toBe(Rank.Queen)
  expect(card.visibility).toBe(Visibility.Private)
})

test('PlayingCard character property returns the appropriate unicode character for the card', () => {
  const card = new PlayingCard(Value.HJ)
  expect(card.character).toBe('♥')
})

test('PlayingCard Deck class method vends a CardSet<PlayingCard> instance', () => {
  const deck = PlayingCard.Deck()
  expect(deck).not.toBe(undefined)
  expect(deck.count).toBe(52)
})

test('PlayingCard Deck can include Jokers', () => {
  const type = DeckType.Standard | DeckType.Jokers
  const deck = PlayingCard.Deck(DeckType.Standard | DeckType.Jokers)
  expect(deck).not.toBe(undefined)
  expect(deck.count).toBe(56)
  expect(deck.cards.some((card) => card.rank === Rank.Joker)).toBeTruthy()
})

import { CardSet, PlayingCard, Value, Rank, Suit } from '../src/index'

test('CardSet `constructor` initializes with the appropriate defaults', () => {
  const pile = new CardSet()
  expect(pile.count).toBe(0)
})

test('CardSet `take` returns properly when no cards', () => {
  const pile = new CardSet()
  const card = pile.take(0)
  expect(card).toBe(undefined)
})

test('CardSet `add` adds a PlayingCard and returns the number of cards', () => {
  const pile = new CardSet<PlayingCard>()
  const card = new PlayingCard(Value.CA)
  const success = pile.add(card)
  expect(success).toBeTruthy()
  expect(pile.count).toBe(1)
})

test('CardSet `add` does not allow a card with the same UUID to be added', () => {
  const pile = new CardSet<PlayingCard>()
  const card = new PlayingCard(Value.CA)
  let success = pile.add(card)
  expect(success).toBeTruthy()
  expect(pile.count).toBe(1)
  // Adding same card a second time should fail
  success = pile.add(card)
  expect(success).toBeFalsy()
  expect(pile.count).toBe(1)
})

describe('Full deck in CardSet', () => {
  let deck: CardSet<PlayingCard>

  beforeEach(() => {
    deck = PlayingCard.Deck()
  })

  test('CardSet `shuffle` will shuffle', () => {
    const orig = deck.cards.slice()
    deck.shuffle()
    expect(orig.some((k, i) => k.uuid !== deck.cards[i].uuid)).toBeTruthy()
  })

  test('CardSet `take` returns the appropriate card', () => {
    const card = deck.take(0)
    expect(card).not.toBe(undefined)
    expect(card?.rank).toBe(Rank.Ace)
    expect(card?.suit).toBe(Suit.Clubs)
    expect(deck.filter((v) => v.uuid === card!.uuid).length).toBe(0)
  })

  test('CardSet `take` from end of deck returns that appropriate card', () => {
    const card = deck.take(deck.count - 1)
    expect(card).not.toBe(undefined)
    expect(card?.suit).toBe(Suit.Spades)
    expect(card?.rank).toBe(Rank.King)
  })

  test('CardSet `next` returns the next card in the set', () => {
    const card = deck.next()
    expect(card).not.toBe(undefined)
    expect(card?.rank).toBe(Rank.Ace)
    expect(card?.suit).toBe(Suit.Clubs)
  })

  test('CardSet `cut` returns a Card from a random location in the CardSet', () => {
    const [card, idx] = deck.cut()
    expect(card).not.toBe(undefined)
    expect(idx).not.toBe(-1)
    expect(card).toBe(deck.card(idx))
  })

  test('CardSet `move` returns true from a move operation and the card is properly located', () => {
    deck.shuffle()
    const fromIdx = 0
    const toIdx = deck.count - 2
    const card = deck.card(fromIdx) // Peek at card without taking it
    expect(card).not.toBe(undefined)

    const success = deck.move(fromIdx, toIdx)
    expect(success).toBeTruthy()
    expect(card!.uuid).toBe(deck.card(toIdx)!.uuid)
  })

  test('CardSet `swap` returns true and cards are properly swapped', () => {
    const fromIdx = 0
    const toIdx = deck.count - 1
    const card = deck.card(fromIdx) // Peek at card without taking it
    expect(card).not.toBe(undefined)

    const success = deck.swap(fromIdx, toIdx)
    expect(success).toBeTruthy()
    expect(card!.uuid).not.toBe(deck.card(fromIdx)!.uuid)
  })

  test('CardSet `sort` returns true and cards are properly sorted', () => {
    const deck: CardSet<PlayingCard> = new CardSet()

    const ten = new PlayingCard(Value.CT)
    deck.add(ten)
    const jack = new PlayingCard(Value.CJ)
    deck.add(jack)
    const queen = new PlayingCard(Value.CQ)
    deck.add(queen)
    const king = new PlayingCard(Value.CK)
    deck.add(king)
    const ace = new PlayingCard(Value.CA)
    deck.add(ace)

    expect(deck.card(deck.count - 1)!.uuid).toBe(ace.uuid)
    deck.sort(PlayingCard.compare)
    expect(deck.card(deck.count - 1)!.uuid).not.toBe(ace.uuid)
    expect(deck.card(0)!.uuid).toBe(ace.uuid)
  })
})

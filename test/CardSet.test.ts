import { CardSet, PlayingCard, Value, Rank, Suit } from '../src/index'

describe('CardSet', () => {
  test('`constructor` initializes with the appropriate defaults', () => {
    const pile = new CardSet()
    expect(pile.count).toBe(0)
  })
  
  test('`take` returns undefined when no cards', () => {
    const pile = new CardSet()
    const card = pile.take(0)
    expect(card).toBe(undefined)
  })
  
  test('`next` returns undefined when there are no more cards', () => {
    const deck = new CardSet<PlayingCard>()
    const card = deck.next()
    expect(card).toBe(undefined)
  })
  
  test('`add` adds a PlayingCard and returns the number of cards', () => {
    const pile = new CardSet<PlayingCard>()
    const card = new PlayingCard(Value.CA)
    const success = pile.add(card)
    expect(success).toBeTruthy()
    expect(pile.count).toBe(1)
  })
  
  test('`add` does not allow a card with the same UUID to be added', () => {
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
  
  test('`cut` returns undefined when there are no cards', () => {
    const deck = new CardSet<PlayingCard>()
    const [card, idx] = deck.cut()
    expect(card).toBe(undefined)
    expect(idx).toBe(-1)
  })
  
  test('`count` is updated correctly when cards are moved or swapped', () => {
    const deck = new CardSet<PlayingCard>()
    const card1 = new PlayingCard(Value.CA)
    const card2 = new PlayingCard(Value.C2)
    const card3 = new PlayingCard(Value.C3)
    deck.add(card1)
    deck.add(card2)
    deck.add(card3)
  
    expect(deck.count).toBe(3)
  
    // Test moving a card
    deck.move(0, 2)
    expect(deck.count).toBe(3)
  
    // Test swapping two cards
    deck.swap(0, 1)
    expect(deck.count).toBe(3)
  })

  describe('Full deck in CardSet', () => {
    let deck: CardSet<PlayingCard>
  
    beforeEach(() => {
      deck = PlayingCard.Deck()
    })
  
    test('`constructor` initializes with the appropriate defaults', () => {
      expect(deck.count).toBe(52)
    })
  
    test('`shuffle` will shuffle', () => {
      const orig = Array.from(deck.cards)
      deck.shuffle()
      expect(orig.some((k, i) => k.uuid !== deck.cards[i].uuid)).toBeTruthy()
    })
  
    test('`take` returns the appropriate card', () => {
      const card = deck.take(0)
      expect(card).not.toBe(undefined)
      expect(card?.rank).toBe(Rank.Ace)
      expect(card?.suit).toBe(Suit.Clubs)
      expect(deck.filter((v) => v.uuid === card!.uuid).length).toBe(0)
    })
  
    test('`take` from end of deck returns that appropriate card', () => {
      const card = deck.take(deck.count - 1)
      expect(card).not.toBe(undefined)
      expect(card?.suit).toBe(Suit.Spades)
      expect(card?.rank).toBe(Rank.King)
    })
  
    test('`next` returns the next card in the set', () => {
      const card = deck.next()
      expect(card).not.toBe(undefined)
      expect(card?.rank).toBe(Rank.Ace)
      expect(card?.suit).toBe(Suit.Clubs)
    })
  
    test('`cut` returns a Card from a random location in the CardSet', () => {
      const [card, idx] = deck.cut()
      expect(card).not.toBe(undefined)
      expect(idx).not.toBe(-1)
      expect(card).toBe(deck.card(idx))
    })
  
    test('`move` returns true from a move operation and the card is properly located', () => {
      deck.shuffle()
      const fromIdx = 0
      const toIdx = deck.count - 2
      const card = deck.card(fromIdx) // Peek at card without taking it
      expect(card).not.toBe(undefined)
  
      const success = deck.move(fromIdx, toIdx)
      expect(success).toBeTruthy()
      expect(card!.uuid).toBe(deck.card(toIdx)!.uuid)
    })
  
    test('`swap` returns true and cards are properly swapped', () => {
      const fromIdx = 0
      const toIdx = deck.count - 1
      const card = deck.card(fromIdx) // Peek at card without taking it
      expect(card).not.toBe(undefined)
  
      const success = deck.swap(fromIdx, toIdx)
      expect(success).toBeTruthy()
      expect(card!.uuid).not.toBe(deck.card(fromIdx)!.uuid)
    })
  
    test('`sort` properly sorts cards', () => {
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
  
    test('`filter` returns the appropriate cards', () => {
      const filtered = deck.filter((v) => v.rank === Rank.Ace)
      expect(filtered.length).toBe(4)
      expect(filtered.every((v) => v.rank === Rank.Ace)).toBeTruthy()
    })
  
    test('`move` returns false when moving a card to the same location', () => {
      const success = deck.move(0, 0)
      expect(success).toBeTruthy()
    })
  
    test('`move` returns false when moving a card to an invalid location', () => {
      const success = deck.move(0, deck.count)
      expect(success).toBeFalsy()
    })
  
    test('`swap` returns true when swapping a card with itself', () => {
      const success = deck.swap(0, 0)
      expect(success).toBeTruthy()
    })
  
    test('`swap` returns false when swapping a card with an invalid location', () => {
      const success = deck.swap(0, deck.count)
      expect(success).toBeFalsy()
    })
  })
})

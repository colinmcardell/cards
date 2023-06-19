import { Card, Visibility } from '../src/index'
import { v1 as uuidv1, NIL as NIL_UUID } from 'uuid'

class GenericCard implements Card {
  uuid: string
  visibility: Visibility

  constructor(visibility?: Visibility) {
    this.visibility = visibility || Visibility.Private
    this.uuid = uuidv1()
  }
}

describe('Card', () => {
  test('Card initializes with default visibility of Card.Visibility.Private', () => {
    const card = new GenericCard()
    expect(card.visibility).toBe(Visibility.Private)
    expect(card.uuid).not.toBe(NIL_UUID)
  })
  
  test('Card initializes with visibility defined as Card.Visibility.Public', () => {
    const card = new GenericCard(Visibility.Public)
    expect(card.visibility).toBe(Visibility.Public)
  })

  describe('CompareFn', () => {
    it('should return -1 if the first card is less than the second card', () => {
      const card1 = new GenericCard()
      const card2 = new GenericCard()
      const compareFn = (first: Card, second: Card) => first.uuid.localeCompare(second.uuid)
      expect(compareFn(card1, card2)).toBe(-1)
    })

    it('should return 0 if the first card is equal to the second card', () => {
      const card1 = new GenericCard()
      const compareFn = (first: Card, second: Card) => first.uuid.localeCompare(second.uuid)
      expect(compareFn(card1, card1)).toBe(0)
    })

    it('should return 1 if the first card is greater than the second card', () => {
      const card1 = new GenericCard()
      const card2 = new GenericCard()
      const compareFn = (first: Card, second: Card) => first.uuid.localeCompare(second.uuid)
      expect(compareFn(card2, card1)).toBe(1)
    })
  })
})

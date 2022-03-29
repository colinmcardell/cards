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

test('Card initializes with default visibility of Card.Visibility.Private', () => {
  const card = new GenericCard()
  expect(card.visibility).toBe(Visibility.Private)
  expect(card.uuid).not.toBe(NIL_UUID)
})

test('Card initializes with visibility defined as Card.Visibility.Public', () => {
  const card = new GenericCard(Visibility.Public)
  expect(card.visibility).toBe(Visibility.Public)
})

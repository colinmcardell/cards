import shuffle from 'lodash.shuffle'

import produce from 'immer'
import type { Draft } from 'immer'
import { Card, CompareFn } from './Card'

// TODO: Add function to merge two CardSets

export class CardSet<T extends Card> {
  cards: Array<T> = []

  /** Count the cards in the CardSet */
  get count() {
    return this.cards.length
  }

  /**
   * Take the next card in the CardSet
   * @return card or undefined
   */
  next(): T | undefined {
    return this.take(0)
  }

  /**
   * Select, remove, and return a card from CardSet at a specific index
   * @param idx index to take
   * @return card or undefined
   */
  take(idx: number): T | undefined {
    const card = this.cards[idx]
    if (card === undefined) {
      return card
    }
    this.cards = produce(this.cards, (draft) => {
      draft.splice(idx, 1)
    })
    return card
  }

  /**
   * Add card to end of CardSet
   * @param card PlayingCard to be added to CardSet
   * @return boolean success or failure of add operation
   */
  add(card: T) {
    if (this.cards.find((c) => c.uuid === card.uuid) !== undefined) {
      return false
    }
    this.cards = produce(this.cards, (draft) => {
      draft.push(card as Draft<T>)
    })
    return true
  }

  /**
   * Peak at a card at the provided location in the CardSet
   * @param idx index of card
   * @return Card or undefined
   */
  card(idx: number): T | undefined {
    const card = this.cards[idx]
    return card
  }

  /**
   * Peek at a random card within the CardSet
   * @return Tuple containing a random Card from CardSet or undefined at index 0 and a number between 0 and the number
   *         of cards in the CardSet or -1 if return Card is undefined
   */
  cut(): [T | undefined, number] {
    const { count } = this

    if (count === 0) {
      return [undefined, -1]
    }
    if (count === 1) {
      return [this.cards[0], 0]
    }

    const idx = Math.floor(Math.random() * count)
    return [this.cards[idx], idx]
  }

  /**
   * Randomly shuffle the cards within a CardSet
   * @return cards in CardSet
   */
  shuffle(): T[] {
    this.cards = produce(this.cards, (draft) => shuffle(draft))
    return this.cards
  }

  /**
   * Sorts Cards in place.
   * @param compareFn Function used to determine the order of the cards. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise.
   */
  sort(compareFn: CompareFn<T>) {
    type DraftCompareFn<T> = (first: Draft<T>, second: Draft<T>) => number
    this.cards = produce(this.cards, (draft) => {
      draft.sort(compareFn as DraftCompareFn<T>)
    })
  }

  /**
   * Move a card from a specific location to a specific location
   * @param from index of card to move
   * @param to index of location to move card to within the CardSet
   * @return boolean value indicating success or failure of the move operation
   */
  move(from: number, to: number): boolean {
    const { length } = this.cards
    if (length === 0 || length === 1) {
      return false
    }
    if (from < 0 || from > length - 1) {
      return false
    }
    if (to < 0 || to > length - 1) {
      return false
    }
    this.cards = produce(this.cards, (draft) => {
      const [card] = draft.splice(from, 1)
      draft.splice(to, 0, card)
    })
    return true
  }

  /**
   * Swap the location of two cards
   * @param first index of the first card location
   * @param second index of the second card location
   * @return boolean value indicating success or failure of the swap operation
   */
  swap(first: number, second: number): boolean {
    let f = first
    let s = second
    if (f === s) {
      return true
    }
    if (f > s) {
      f = second
      s = first
    }

    if (this.move(s, f) !== true) {
      return false
    }

    if (this.move(f + 1, s) !== true) {
      return false
    }

    return true
  }

  /**
   * Returns the cards that meet the condition specified in a callback function. Filter the cards in the CardSet and
   * return the results. Same functionality as Array.filter
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one
   *        time for each element in the array.
   * @return Cards that meet the conditions specified in the provided predicate
   */
  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    const cards = this.cards.filter(predicate)
    return cards
  }
}

export default CardSet

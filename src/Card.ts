export enum Visibility {
  Private = 'Private',
  Public = 'Public',
  Blind = 'Blind',
}

export type CompareFn<T extends Card> = (first: T, second: T) => number

export interface Card {
  uuid: string
  visibility: Visibility
}

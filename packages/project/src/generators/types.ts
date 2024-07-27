import { type ActionType } from 'plop'

export type TDynamicActionsFunction<T> = (answers?: T) => ActionType[]

export type TActions<T> = TDynamicActionsFunction<T> | ActionType[]

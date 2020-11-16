import {
    GetterTree,
    MutationTree,
    Module,
    Store as VuexStore,
    CommitOptions,
} from 'vuex'

import { State as RootState } from './main.store'

export type State = {
    visitedAt: number
}

const state: State = {
    visitedAt: Date.now(),
}

export enum MutationTypes {
    RESET_VISIT_TIME = 'RESET_VISIT_TIME',
}

export type Mutations<S = State> = {
    [MutationTypes.RESET_VISIT_TIME](state: S): void
}

const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.RESET_VISIT_TIME](state: State) {
        state.visitedAt = Date.now()
    },
}

export type Getters = {
    visitedAt(state: State): number
}

export const getters: GetterTree<State, RootState> & Getters = {
    visitedAt: (state) => {
        return state.visitedAt
    },
}

export type Store<S = State> = Omit<
    VuexStore<S>,
    'commit' | 'getters' | 'dispatch'
    > & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions,
    ): ReturnType<Mutations[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}

export const VisitTimeModule: Module<State, RootState> = {
    state,
    mutations,
    getters,
}
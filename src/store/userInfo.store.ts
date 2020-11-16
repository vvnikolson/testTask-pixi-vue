import {
    ActionContext,
    ActionTree,
    CommitOptions,
    DispatchOptions,
    GetterTree,
    Module,
    MutationTree,
    Store as VuexStore,
} from 'vuex'

import {State as RootState} from './main.store'

import {MapPlace, UserInfo} from "../models/UserInfo";
import IUserRepo from "../api/IUserRepo";
import UserRepo from "../api/MockUserRepo"

const userRepo : IUserRepo = UserRepo


// Объявление состояния
export type State = {
    info: UserInfo | null,
}

// Инициализация состояние
const state: State = {
    info: null
}

// Мутации
export enum MutationTypes {
    SET_USER_INFO = "SET_USER_INFO",
}

// Интерфейс мутаций
export type Mutations<S = State> = {
    [MutationTypes.SET_USER_INFO](state: S, payload: UserInfo): void
};

// Реализация объявленных интерфейсов мутация
const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_USER_INFO](state: State, payload: UserInfo) {
        state.info = payload
    }
};

// действия
export enum ActionTypes {
    getUserInfo = "getUserInfo"
}

// Интерфейсы действий
export interface Actions {
    [ActionTypes.getUserInfo](
        { commit }: AugmentedActionContext
    ): void;
}

// Расширяем тип ActionContext: фиксируем только объявленные ранее мутации
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

// Реализация интерфейсов действий
export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.getUserInfo]({ commit }) {
        try {
            //await new Promise(resolve => setTimeout( resolve, 3000))
            const data = await userRepo.getInfo()
            commit(MutationTypes.SET_USER_INFO, data)
        } catch (e) {
            console.log(e)
        }

    }
};

// интерфейсы геттеров
export type Getters = {
    getMapPlaces(state: State) : Array<MapPlace>
}

// Реализация геттеров
export const getters: GetterTree<State, RootState> & Getters = {
    getMapPlaces(state: State): Array<MapPlace> {
        return state.info?.mapPlaces ?? []
    }
}

// Этот код отвратителен, но иначе останемся без типизации
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
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
    ): ReturnType<Actions[K]>
}

export const UserInfoModule: Module<State, RootState> = {
    state,
    mutations,
    actions,
    getters,
}
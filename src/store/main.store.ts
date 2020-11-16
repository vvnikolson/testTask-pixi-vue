import { createStore, createLogger } from 'vuex'

import {
    VisitTimeModule,
    Store as VisitTimeStore,
    State as VisitTimeState,
} from './visitTime.store'

import {
    UserInfoModule,
    Store as UserInfoStore,
    State as UserInfoState,
} from './userInfo.store'

export type State = {
    visitTime: VisitTimeState
    userInfo: UserInfoState
}

export type Store =
    VisitTimeStore<Pick<State, 'visitTime'>> &
    UserInfoStore<Pick<State, 'userInfo'>>
// Vuex хранилище состоит из двух модулей
// в одном -- данные пользователя
// во втором -- время с момента захода на страницу
// Разделено тк первый модуль использует API и данные могут быть получены с задержкой
// Данные из второго модуля локальны и доступны сразу
export const store = createStore({
    plugins:
        process.env.NODE_ENV === 'production'
            ? []
            : [createLogger()],
    modules: { visitTime: VisitTimeModule, userInfo: UserInfoModule },
})

export function getStore(): Store {
    return store as Store
}

export default store
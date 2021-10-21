import { cloneDeep } from 'lodash'

const initialState = {
  prefList: [],
}

// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getPrefList(state) {
    return state.prefList
  },
}

export const mutations = {
  initPrefSet(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefList = payload
    }
  },
}

export const actions = {
  async fetchPrefAPI({ commit }) {
    const data = await import('~/data/codes/preflist.json')
    commit('initPrefSet', data.result)
  },
}

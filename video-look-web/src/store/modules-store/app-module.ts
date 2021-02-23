import Cookies from 'js-cookie';
import { GetterTree, MutationTree, ActionTree, Module, Getter } from 'vuex';
import { AppState } from '../states/app-state';
import { AppTypes } from '../types/app-types';

const getters: GetterTree<AppState, AppState> = {
  [AppTypes.getters.CONFIGS]: (state: any) => state.configs || {},
  [AppTypes.getters.LANGUAGE]: (state: any) => state.language || 'zh',
};

const mutations: MutationTree<AppState> = {
  [AppTypes.mutations.SET_LANGUAGE]: (state: any, language: any) => {
    state.language = language;
    Cookies.set(AppTypes.getters.LANGUAGE, language);
  },
  [AppTypes.mutations.SET_CONFIGS]: (state: any, configs: any) => {
    state.configs = configs;
    Cookies.set(AppTypes.getters.CONFIGS, configs);
  },
};

const actions: ActionTree<AppState, AppState> = {
  [AppTypes.actions.SET_LANGUAGE]({ commit }, language: any) {
    commit(AppTypes.mutations.SET_LANGUAGE, language);
  },
  [AppTypes.actions.SET_CONFIGS]({ commit }, configs: any) {
    commit(AppTypes.mutations.SET_CONFIGS, configs);
  }
};

const appModule: Module<AppState, AppState> = {
  state: new AppState(),
  getters,
  mutations,
  actions
};

export default appModule;

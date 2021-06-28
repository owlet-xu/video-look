import { SessionStorageKeys, MySessionStorage } from '@/utils/strorage/session-storage';
import { GetterTree, MutationTree, ActionTree, Module, Getter } from 'vuex';
import { AppState } from '../states/app-state';
import { AppTypes } from '../types/app-types';

const getters: GetterTree<AppState, AppState> = {
  [AppTypes.getters.CONFIGS]: (state: any) => state.configs || {},
  [AppTypes.getters.LANGUAGE]: (state: any) => {
    const language = MySessionStorage.getItem(SessionStorageKeys.language);
    // 这里设置默认启动语言
    return language || state.lang || state.configs.lang || 'en';
  },
};

const mutations: MutationTree<AppState> = {
  [AppTypes.mutations.SET_LANGUAGE]: (state: any, language: any) => {
    state.language = language;
    MySessionStorage.setItem(SessionStorageKeys.language, language);
  },
  [AppTypes.mutations.SET_CONFIGS]: (state: any, configs: any) => {
    state.configs = configs;
    MySessionStorage.setObject(SessionStorageKeys.configs, configs);
  },
};

const actions: ActionTree<AppState, AppState> = {
  [AppTypes.actions.SET_LANGUAGE]({ commit }, language: string) {
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

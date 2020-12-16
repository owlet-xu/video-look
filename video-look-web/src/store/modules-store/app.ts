import Cookies from 'js-cookie';

const app = {
  state: {
    language: Cookies.get('language') || 'zh',
    configs: {}
  },
  mutations: {
    SET_LANGUAGE: (state: any, language: any) => {
      state.language = language;
      Cookies.set('language', language);
    },
    SET_CONFIGS: (state: any, configs: any) => {
      state.configs = configs;
      Cookies.set('configs', configs);
    },
  },
  actions: {
    setLanguage({ commit }: any, language: any) {
      commit('SET_LANGUAGE', language);
    },
    setConfigs({ commit }: any, configs: any) {
      commit('SET_CONFIGS', configs);
    }
  }
};

export default app;

// tslint:disable
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { AppTypes } from '../store/types/app-types';
import store from '../store';

const zh = require ('./zh-CN.json');
const en = require ('./en-US.json');
const elementEnLocale = require ('element-ui/lib/locale/lang/en'); // element-ui lang
const elementZhLocale = require ('element-ui/lib/locale/lang/zh-CN'); // element-ui lang
const elementEsLocale = require ('element-ui/lib/locale/lang/es'); // element-ui lang



const ElementLocale = require('element-ui/lib/locale');

Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    ...elementEnLocale
  },
  zh: {
    ...zh,
    ...elementZhLocale
  }
};
// console.log(store.getters[AppTypes.getters.LANGUAGE], '--ddd--');
const i18n = new VueI18n({
  locale: store.getters[AppTypes.getters.LANGUAGE],
  messages
});
// 解决Element-ui组件内的词条
ElementLocale.use(i18n.locale);
// ElementLocale.i18n((key: any, value: any) => i18n.t(key, value));
export default i18n;

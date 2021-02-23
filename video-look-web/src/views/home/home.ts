import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';
// components
import HeadBar from '@/components/head/head.vue';
import { AppTypes } from '@/store/types/app-types';

@Component({
  components: {
    HeadBar
  }
})
export default class Home extends Vue {
  @Action(AppTypes.actions.SET_LANGUAGE) setLanguage!: (language: any) => void;
  @Getter(AppTypes.getters.LANGUAGE) getLanguage!: string;

  private language = '';
  private path = 'video';

  created() {
    this.language = this.getLanguage;
    console.log(this.language);
  }

  languageChange(val: any) {
    this.setLanguage(val);
    this.$router.go(0);
  }

  createVideoPreview() {
    IpcRenderer.send(EventType.BIZ.CREATE_VIDEO_PREVIEW, this.path);
  }
}

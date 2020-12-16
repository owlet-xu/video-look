import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class Home extends Vue {
  @Action('setLanguage') setLanguage!: (language: any) => void;
  @Getter('language') getLanguage!: string;

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
    console.log(this.path, '---this.path--');
    IpcRenderer.send(EventType.BASE.CREATE_VIDEO_PREVIEW, this.path);
  }
}

import { Vue, Component } from 'vue-property-decorator';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class VideoPreview extends Vue {

  private path = 'video';

  createVideoPreview() {
    console.log(this.path, '---this.path--');
    IpcRenderer.send(EventType.BIZ.CREATE_VIDEO_PREVIEW, this.path);
  }
}

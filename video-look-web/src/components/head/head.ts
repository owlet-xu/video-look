import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class Head extends Vue {
    title = '';
    handleMinimize() {
        IpcRenderer.send(EventType.BASE.WINDOW_MIN);
    }

    handleMaximize() {
        IpcRenderer.send(EventType.BASE.WINDOW_MAX);
    }

    handleClose() {
        IpcRenderer.send(EventType.BASE.APP_EXIT);
    }
}

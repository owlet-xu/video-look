import { Vue, Component } from 'vue-property-decorator';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class CutFiles extends Vue {

    private sourcePath = 'E:\\a';
    private targetPath = 'E:\\a\\b\\';
    private loading = false;

    cutFiles() {
        this.loading = true;
        const data = { sourcePath: this.sourcePath, targetPath: this.targetPath };
        IpcRenderer.send(EventType.BIZ.CUT_FILES, data);
    }
}

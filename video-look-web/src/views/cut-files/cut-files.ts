import { Vue, Component } from 'vue-property-decorator';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class CutFiles extends Vue {

    private sourcePath = 'E:\\a';
    private targetPath = 'E:\\a\\b\\';

    private sourcePath2 = 'E:\\a\\';
    private keywords = 'aa|bb';
    private loading = false;

    cutFiles() {
        this.loading = true;
        const data = { sourcePath: this.sourcePath, targetPath: this.targetPath };
        IpcRenderer.send(EventType.BIZ.CUT_FILES, data);
    }

    replaceChars() {
        this.loading = true;
        const temp = this.keywords.split('|');
        const data = {
            sourcePath: this.sourcePath2,
            oldWords: temp[0],
            newWords: temp[1] };
        IpcRenderer.send(EventType.BIZ.REPLACE_CHARS, data);
    }
}

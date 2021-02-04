import { Vue, Component } from 'vue-property-decorator';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class FindFile extends Vue {

    private pathSource = 'E:\\moves\\字幕\\所有字幕';
    private keyWords = '';
    private result = [];
    private loading = false;

    created() {
        IpcRenderer.on(EventType.BIZ.FIND_FILE_RESULT).subscribe((res: any) => {
            if (!Array.isArray(res.args) || res.args.length === 0) {
                return;
            }
            this.loading = false;
            this.result = res.args[0];
            console.log(this.result);
        });
    }

    matchChinese() {
        this.loading = true;
        const data = { pathSource: this.pathSource, keyWords: this.keyWords };
        IpcRenderer.send(EventType.BIZ.FIND_FILE, data);
    }

    showItemInFolder(path: string) {
        IpcRenderer.send(EventType.BASE.SHOW_ITEM_IN_FOLDER, path);
    }
}

import { Vue, Component } from 'vue-property-decorator';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';

@Component
export default class MatchChinese extends Vue {

    private pathChinese = 'E:\\BaiduNetdiskDownload\\15500+字幕\\15500+字幕';
    private pathVideo = 'F:\\迅雷下载';
    private result = [];
    private loading = false;

    created() {
        IpcRenderer.on(EventType.BIZ.SEND_CHINESE_LANGUAGE).subscribe((res: any) => {
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
        const data = { pathChinese: this.pathChinese, pathVideo: this.pathVideo };
        IpcRenderer.send(EventType.BIZ.FIND_CHINESE_LANGUAGE, data);
    }

    showItemInFolder(path: string) {
        IpcRenderer.send(EventType.BASE.SHOW_ITEM_IN_FOLDER, path);
    }
}

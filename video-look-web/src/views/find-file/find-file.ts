import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { EventType } from '@/utils/ipc/ipc-event-type';
import { IpcRenderer } from '@/utils/ipc/ipc-renderer';
import { AppTypes } from '@/store/types/app-types';

@Component
export default class FindFile extends Vue {
    @Getter(AppTypes.getters.CONFIGS) configs: any;
    private pathSource = 'E:\\moves\\字幕\\所有字幕';
    private keyWords = '';
    private result = [];
    private loading = false;

    created() {
        this.pathSource = this.configs.defaultSearchPath;
        IpcRenderer.on(EventType.BIZ.FIND_FILE_RESULT).subscribe((res: any) => {
            if (!Array.isArray(res.args) || res.args.length === 0) {
                return;
            }
            this.loading = false;
            this.result = res.args[0];
            console.log(this.result);
        });
    }

    /**
     * 递归查找文件夹
     * @returns
     */
    findFiles() {
        if (!this.pathSource || !this.keyWords) {
            this.$message.warning('请输入信息');
            return;
        }
        this.loading = true;
        const data = { pathSource: this.pathSource, keyWords: this.keyWords };
        IpcRenderer.send(EventType.BIZ.FIND_FILE, data);
    }

    /**
     * 只查询当前
     */
    findFilesNoDeep() {
        if (!this.pathSource || !this.keyWords) {
            this.$message.warning('请输入信息');
            return;
        }
        this.loading = true;
        const data = { pathSource: this.pathSource, keyWords: this.keyWords, type: 'nodeep' };
        IpcRenderer.send(EventType.BIZ.FIND_FILE, data);
    }

    showItemInFolder(path: string) {
        IpcRenderer.send(EventType.BASE.SHOW_ITEM_IN_FOLDER, path);
    }
}

/**
 * electron事件注册器
 */

export const EventType = {
  // 基础
  BASE: {
    LOGOUT: 'logout', // 登出
    LOGIN_SUCCESS: 'login_success', // 登录成功
    APP_EXIT: 'app_exit', // 应用程序退出
    EXIT_PROCESS: 'exit_process', // 进程退出
    SHOW_ITEM_IN_FOLDER: 'show_item_in_folder', // 打开文件所在目录
    WINDOW_MIN: 'window_min', // 窗口最小
    WINDOW_MAX: 'window_max' // 窗口最大
  },
  BIZ: {
    CREATE_VIDEO_PREVIEW: 'create_video_preview', // 创建视频缩略图
    FIND_CHINESE_LANGUAGE: 'find_chinese_language', // 匹配本地字幕
    FIND_CHINESE_LANGUAGE_RESULT: 'find_chinese_language_result', // 匹配本地字幕结果
    FIND_FILE: 'find_file', // 查找文件夹
    FIND_FILE_RESULT: 'find_file_result', // 查找文件夹结果
    CUT_FILES: 'cut_files' // 剪切文件到指定目录
  }
};

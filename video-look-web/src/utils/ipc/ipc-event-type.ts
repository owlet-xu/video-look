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
    SEND_CHINESE_LANGUAGE: 'send_chinese_language'// 发送匹配结果给前端
  }
};

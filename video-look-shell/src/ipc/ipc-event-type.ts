export const IpcEventType = {
  // 基础
  BASE: {
    LOGOUT: 'logout', // 登出
    LOGIN_SUCCESS: 'login_success', // 登录成功
    APP_EXIT: 'app_exit', // 应用程序退出
    EXIT_PROCESS: 'exit_process', // 进程退出
    WINDOW_MIN: 'window_min', // 窗口最小
    WINDOW_MAX: 'window_max', // 窗口最大
    CREATE_VIDEO_PREVIEW: 'create_video_preview' // 创建视频缩略图
  },
  // 切换事件
  SWITCH: {
    CHANGE_LANGUAGE: 'change_language' // 切换语言
  }
};

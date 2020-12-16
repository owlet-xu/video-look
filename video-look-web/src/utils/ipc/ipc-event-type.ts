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
    CREATE_VIDEO_PREVIEW: 'create_video_preview', // 创建视频缩略图
  }
};

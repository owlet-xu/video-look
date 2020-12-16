import electron from 'electron';

/**
 * 获取主屏
 *
 * @returns
 */
export function getPrimaryScreen() {
  return electron.screen.getPrimaryDisplay();
}


/**
 * 获取其它屏幕。
 * 如果只有一个屏幕，则返回主屏
 *
 * @returns
 */
export function getOtherScreen() {
  const displays = electron.screen.getAllDisplays();
  if (displays && displays.length > 1) {
    const firstScreen = getPrimaryScreen();
    const secondScreen = displays.find(display => {
      return display.bounds.x !== 0;
    });
    return secondScreen || firstScreen;
  } else {
    return displays[0];
  }
}

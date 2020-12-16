
/**
 * 获取网络信息
 *
 * @export
 * @returns {({ address: string, mac: string } | undefined)}
 */
export function getNetwork(): { address: string, mac: string } | undefined {
  if (isElectron()) {
    return (window as any)['network'];
  }
}

/**
 * 获取机器名称
 *
 * @export
 * @returns {(string | undefined)}
 */
export function getComputerName(): string | undefined {
  if (isElectron()) {
    return (window as any)['computerName'];
  }
}

function isElectron(): boolean {
  return navigator.userAgent.indexOf('Electron') !== -1;
}

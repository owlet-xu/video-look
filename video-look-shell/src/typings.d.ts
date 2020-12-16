/* SystemJS module definition */
declare var module: NodeModule;

declare module 'fluent-ffmpeg' {
  const FfmpegCommand: any;
  export default FfmpegCommand;
}
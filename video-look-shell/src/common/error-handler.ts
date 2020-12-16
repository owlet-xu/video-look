import logger from './logger';

/**
 * 开启全局异常捕获
 */
export function startGlobalErrorHandle() {
  process.on('uncaughtException', function(err) {
    logger.error('Uncaught Exception', err.message);
    if (err.stack) {
      logger.error(err.stack);
    }
  });

  process.on('unhandledRejection', function(err: any) {
    if (err) {
      logger.error('Uncaught Exception', err.message);
      logger.error(err.stack);
    }
  });
}

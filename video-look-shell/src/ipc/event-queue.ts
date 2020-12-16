import logger from '../common/logger';

class EventQueue {
  public readyToReceive = false;
  private events: any[] = [];
  private timer: any = null;

  enqueue(event: any) {
    logger.info(`Cache Event: ${event[0]}`);
    this.events.push(event);
  }

  dequeue() {
    return this.events.shift();
  }

  isEmpty() {
    return this.events && this.events.length === 0;
  }

  startReceive() {
    this.readyToReceive = true;
  }

  stopReceive() {
    this.readyToReceive = false;
  }

  clean() {
    this.events = [];
  }

  emit(emitter: (...args: any[]) => void, interval = 0) {
    if (!emitter || typeof emitter !== 'function') {
      return;
    }
    if (this.timer) {
      return;
    }
    if (this.isEmpty()) {
      return;
    }
    this.timer = setInterval(() => {
      const event = this.dequeue();
      logger.info(`Emit Event: ${event[0]}`);
      emitter(...event);
      if (this.isEmpty()) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, interval);
  }
}

export const eventQueue = new EventQueue();

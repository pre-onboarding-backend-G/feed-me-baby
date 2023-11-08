import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  debug(message: object | string, context?: string): void {
    super.debug(`🐛 ${JSON.stringify(message, null, '\t')}`, context);
  }
  warn(message: object | string, context?: string): void {
    super.warn(`🚨 ${JSON.stringify(message, null, '\t')}`, context);
  }
  log(message: object | string, context?: string): void {
    super.log(`🪵 ${JSON.stringify(message, null, '\t')}`, context);
  }
  error(message: object | string, context?: string): void {
    super.error(`💥 ${JSON.stringify(message, null, '\t')}`, context);
  }
}

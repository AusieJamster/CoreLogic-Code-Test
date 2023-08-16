import type { Logger } from 'winston';
import winston from 'winston';

export const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  defaultMeta: { service: 'corelogic-code-test' },
  transports: [new winston.transports.Console()]
});

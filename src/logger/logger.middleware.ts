import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    console.log('METHOD:', req.method);
    console.log('URL:', req.url);
    next();
  }
}

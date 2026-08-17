import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { IncomingMessage, ServerResponse } from 'node:http';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    // console.log('METHOD:', req.method);
    // console.log('URL:', req.url);
    console.log(` Request received for: ${req.method} ${req.originalUrl}`);
    next();
  }
}

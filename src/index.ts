import { Response, Request } from 'express'

export abstract class HttpError extends Error {
    statusCode: number;
}
export class ErrorNotFound extends HttpError {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

export class ErrorBadRequest extends HttpError {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

export type RequestHandler<T> = (req: Request) => Promise<T>

export function routerAdapter<T>( handler: RequestHandler<T>) {
  return (req: Request, res: Response) => {
    const promise = handler(req);

    promise
    .then((v) => {
        res.status(200).json(v)
    }).catch((e) => {
        if (e instanceof HttpError) {
            return res.status(e.statusCode).json(e)
        }
        res.status(500).json(e)
    })
  }
}


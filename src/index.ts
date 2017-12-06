import { Response, Request } from 'express'

export class HttpError extends Error {
    statusCode: number;
    constructor(httpStatusCode: number, message: string) {
        super(message)
        this.statusCode = httpStatusCode;
    }
}
export class ErrorNotFound extends HttpError {
    constructor(message) {
        super(404, message)        
    }
}

export class ErrorBadRequest extends HttpError {
    constructor(message) {
        super(400, message)
    }
}

export class ErrorForbidden extends HttpError {
    constructor(message) {
        super(403, message)
    }
}

export type RequestHandler<T> = (req: Request) => Promise<T>

export function routerAdapter<T>( handler: RequestHandler<T>) {
  return (req: Request, res: Response) => {
    const promise = (() => {
        try {
            return handler(req);
        } catch (e) {
            return Promise.reject(e);
        }
    })();
    

    promise
    .then((v) => {
        res.status(200).json(v)
    }).catch((e) => {
        handleError(res, e);
    })
  }
}

function handleError(res: Response, error: any) {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json(error)
    }
    res.status(500).json(error)
}


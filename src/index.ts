import { Response, Request } from 'express'
import * as VError from 'verror';

export class HttpError extends VError {
    statusCode: number;
    constructor(httpStatusCode: number, message: string, error?: Error) {
        if (error) {   
          super(error, message)
        } else {
          super(message)
        }
        this.statusCode = httpStatusCode;
    }
}
export class ErrorNotFound extends HttpError {
    constructor(message, error?: Error) {
        super(404, message, error)        
    }
}

export class ErrorBadRequest extends HttpError {
    constructor(message, error?: Error) {
        super(400, message, error)
    }
}

export class ErrorForbidden extends HttpError {
    constructor(message, error?: Error) {
        super(403, message, error)
    }
}

export type RequestHandler<T> = (req: Request) => Promise<T>

export function routerAdapter<T>( handler: RequestHandler<T>, onError?: (e: any, req: Request) => void) {
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
        if (onError){
          if (e instanceof Error) {
            /// Workaround to show full error in the logs 
            e.stack = VError.fullStack(e)
          }
          onError(e, req);
        }
        handleError(res, e);
    })
  }
}

function handleError(res: Response, error: any) {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json(error.message)
    }
    res.status(500).json({ message: error.message, stack: error.stack, obj: error})
}


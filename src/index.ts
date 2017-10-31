import { Response } from 'express'

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

export function routerAdapter(res: Response, p: Promise<any>) {

    p
        .then((v) => {
            res.status(200).json(v)
        }).catch((e) => {
            if (e instanceof HttpError) {
                return res.status(e.statusCode).json(e)
            }
            res.status(500).json(e)
        })
}


//   function controllerTest(d) {
//     return Promise.resolve(`sdfsdfds ${d}`);
//   }

//   router.get('/test/:ddd', (req, res, next) => {
//     routerAdapter(res, controllerTest(req.params.ddd))
//   })

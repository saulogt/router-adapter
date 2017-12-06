
import { HttpError, routerAdapter } from '../src'
import { assert } from 'console';
import { createRequest, createResponse } from './mock/express'

describe('router adapter basic feature', () => {
  it('can be created', (done) => {

    const req = createRequest()
    const res = createResponse((status) => {
      if (status === 200) {
        done()
      } else {
        done(new HttpError(status, 'Oops'))
      }
    });

    routerAdapter((obj) => {
      return Promise.resolve("");
    })(req, res)
    
    
  })
})
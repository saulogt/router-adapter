
import { HttpError } from '../src'
import { assert } from 'console';

describe('Base error', () => {
  it('can be created with code 500', () => {
    const e = new HttpError(500, 'Internal error')
    assert(e.statusCode === 500, 'status code should be 500')
    assert(e.message === 'Internal error')
    assert(e instanceof Error, 'It must be an instance of Error')
  })
})
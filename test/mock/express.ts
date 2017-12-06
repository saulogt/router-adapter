
import { Request, Response} from 'express'

export function createResponse(cb): Response {

  const obj = Object.create(null)
  obj.status = function (s: number) {
    this.statusCode = s
    cb(s)
    return this;
  }

  obj.json = function (obj) {
    this.response = JSON.stringify(obj);
    return this
  }

  return obj
} 

export function createRequest(): Request {
  
    const obj = Object.create(null)
    
    return obj
  } 


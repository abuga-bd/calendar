import { ServerMiddleware } from '@nuxt/types'

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // console.log(req.headers)
  next();
}

export default myServerMiddleware
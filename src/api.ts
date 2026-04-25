import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'

import { authHandler, initAuthConfig } from '@hono/auth-js'
import authConfig from '@/configs/auth.config'
import router from './lib/routes'

const api = new Hono().basePath('/api')

api.use(secureHeaders())
api.use(logger())
api.use(prettyJSON())
api.use('*', requestId())
api.use('*', cors())
api.use(
  '*',
  initAuthConfig(() => ({
    basePath: '/api/auth',
    ...authConfig,
  })),
)
api.use('/auth/*', authHandler())
api.route('', router)

export default handle(api)

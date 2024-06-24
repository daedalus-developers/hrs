import { AppType } from '@server'
import { hc } from 'hono/client'

const client = hc<AppType>(process.env.SERVER_HOST!, {
  headers: { 'x-hono': 'fire' },
  init: {
    credentials: 'include'
  }
})

export { client }

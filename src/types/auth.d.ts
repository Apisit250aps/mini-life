import type { DefaultSession } from '@auth/core'

declare module '@auth/core/types' {
  interface User {
    id: string
    name: string
    email: string
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      isAdmin: boolean
    } & DefaultSession['user']
  }
}

import { AuthConfig } from '@auth/core'
import Credentials from '@auth/core/providers/credentials'
import Google from '@auth/core/providers/google'
import userRepository from '@/internal/repositories/user.repo'

const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Google,
    Credentials({
      name: 'credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }
        const { name, password } = credentials as {
          name: string
          password: string
        }
        const user = await userRepository.login(name, password)
        if (!user) {
          return null
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
} as AuthConfig

export default authConfig

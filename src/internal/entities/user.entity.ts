import * as field from '@aps/next-api/entities'
import { z } from 'zod'

const UserEntity = field.BaseEntity({
  name: field.StringField(),
  email: field.EmailField(),
  password: field.StringField().optional().nullable(),
  isActive: field.BooleanField().default(true),
  isAdmin: field.BooleanField().default(false),
  lastLogin: field.DateTimeField().optional().nullable(),
})

export type UserEntity = z.infer<typeof UserEntity>

export default UserEntity

import type { CreateInput, UpdateInput } from '@aps/next-api'
import { UserEntity } from '../entities/user.entity'

export type User = UserEntity
export type CreateUserInput = CreateInput<User>
export type UpdateUserInput = UpdateInput<User>

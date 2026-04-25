import Repository from '@aps/next-api/repository'
import { User } from '../domain/user'
import UserEntity from '../entities/user.entity'
import client from '@/lib/mongo'
import { Abortable, Filter, FindOptions, IndexDescription } from 'mongodb'
import type { CreateInput } from '@aps/next-api'

import * as argon2 from 'argon2'
import { omit } from 'lodash'

class UserRepository extends Repository<User> {
  readonly collectionName: string = 'users'
  readonly schema = UserEntity

  readonly indexes: IndexDescription[] = [
    {
      key: { name: 1 },
      unique: true,
      name: 'name_unique_index',
      partialFilterExpression: { deletedAt: null },
    },
    {
      key: { email: 1 },
      unique: true,
      name: 'email_unique_index',
      partialFilterExpression: { deletedAt: null },
    },
  ]

  async create(item: CreateInput<User & { password: string }>): Promise<User> {
    const hashedPassword = await argon2.hash(item.password)
    const user = await super.create({
      ...item,
      password: hashedPassword,
    })

    return user
  }

  async login(name: string, password: string): Promise<User | null> {
    const collection = await this.getCollection()
    const user = await collection.findOne({ name, deletedAt: null })

    if (!user) return null

    if (!user.isActive) return null

    const isPasswordValid = await argon2.verify(user.password!, password)
    if (!isPasswordValid) {
      return null
    }

    await this.update(user.id, { lastLogin: new Date() })

    return user
  }

  async findAll(
    filters: Filter<User>,
    options?: FindOptions & Abortable,
  ): Promise<User[]> {
    return super.findAll(
      { ...filters, deletedAt: null },
      { projection: { password: 0, _id: 0, deletedAt: 0 }, ...options },
    )
  }

  async findById(id: string): Promise<User | null> {
    return super.findById(id).then((user) => {
      if (!user || user.deletedAt) {
        return null
      }
      return omit(user, 'password')
    })
  }
}

const userRepository = new UserRepository(client)

export default userRepository

import { Controller } from '@aps/next-api'
import { User } from '@/internal/domain/user'
import userRepository from '@/internal/repositories/user.repo'

class UserController extends Controller<User> {
  readonly repository = userRepository
  override readonly group = 'api'
  override readonly prefix = 'users'
}

export default UserController

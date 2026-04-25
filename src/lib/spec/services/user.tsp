using TypeSpec.Http;
using TypeSpec.Rest;

namespace MiniLifeService;

@route("/users")
@tag("Users")
interface UserService {
  @get
  listUsers(): ApiResponse<User[]> | ApiError;

  @post
  createUser(@body request: CreateUserRequest): ApiResponse<User> | ApiError;

  @route("{id}")
  @get
  getUser(@path id: string): ApiResponse<User> | ApiError;

  @route("{id}")
  @put
  updateUser(
    @path id: string,
    @body request: UpdateUserRequest,
  ): ApiResponse<User> | ApiError;

  @route("{id}")
  @delete
  deleteUser(@path id: string): ApiResponse<EmptyData> | ApiError;
}

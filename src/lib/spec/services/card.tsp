using TypeSpec.Http;
using TypeSpec.Rest;

namespace MiniLifeService;

@route("/cards")
@tag("Cards")
interface CardService {
  @get
  listCards(): ApiResponse<Card[]> | ApiError;

  @post
  createCard(@body request: CreateCardRequest): ApiResponse<Card> | ApiError;

  @route("{id}")
  @get
  getCard(@path id: string): ApiResponse<Card> | ApiError;

  @route("{id}")
  @put
  updateCard(
    @path id: string,
    @body request: UpdateCardRequest,
  ): ApiResponse<Card> | ApiError;

  @route("{id}")
  @delete
  deleteCard(@path id: string): ApiResponse<EmptyData> | ApiError;
}

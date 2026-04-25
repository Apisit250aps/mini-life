import { Controller } from '@aps/next-api'
import { CardEntity } from '../entities/card.entity'
import cardRepository from '../repositories/card.repo'

class CardController extends Controller<CardEntity> {
  readonly repository = cardRepository
  override readonly group = 'api'
  override readonly prefix = 'cards'
}

export default CardController

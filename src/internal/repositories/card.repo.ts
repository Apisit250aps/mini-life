import Repository from '@aps/next-api/repository'

import { BaseCardEntity, CardEntity } from '../entities/card.entity'
import client from '@/lib/mongo'

class CardRepository extends Repository<CardEntity> {
  readonly collectionName: string = 'cards'
  readonly schema = BaseCardEntity
}

const cardRepository = new CardRepository(client)

export default cardRepository

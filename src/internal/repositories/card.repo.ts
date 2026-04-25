import Repository from '@aps/next-api/repository'

import { BaseCardEntity, CardEntity } from '../entities/card.entity'
import client from '@/lib/mongo'

class CardRepository extends Repository<CardEntity> {
  readonly collectionName: string = 'cards'
  readonly schema = BaseCardEntity

  readonly indexes = [
    {
      key: { title: 1, card: 1 },
      unique: true,
    },
  ]
}

const cardRepository = new CardRepository(client)

export default cardRepository

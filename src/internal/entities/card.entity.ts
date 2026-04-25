import * as field from '@aps/next-api/entities'
import { z } from 'zod'

const CARD_TYPE = ['KNOWLEDGE', 'SKILL', 'DANGEROUS', 'AGE'] as const

const BaseCardEntity = field.BaseEntity({
  // general
  /* title card */
  title: field.StringField(),
  card: field
    .EnumField(...CARD_TYPE)
    .default('KNOWLEDGE')
    .unwrap(),
  // dangerous
  pick: field.NumberField().nullable().default(null).unwrap().optional(),
  dangerous: z
    .array(z.number().min(0).max(10))
    .length(3)
    .default([0, 0, 0])
    .unwrap()
    .optional(),
  // knowledge and skill
  score: field.NumberField().default(0).unwrap().optional(),
  action: field.StringField().nullable().default(null).unwrap().optional(),
  token: field.NumberField().min(1).max(2).default(1).unwrap().optional(),
  // age
  age: field.NumberField().nullable().default(null).unwrap().optional(),
  ageLevel: field.NumberField().nullable().default(null).unwrap().optional(),
})

const CardKnowledgeEntity = BaseCardEntity.omit({
  age: true,
  ageLevel: true,
  dangerous: true,
  pick: true,
})

const CardSkillEntity = BaseCardEntity.omit({
  age: true,
  ageLevel: true,
  dangerous: true,
  pick: true,
})

const CardDangerousEntity = BaseCardEntity.omit({
  age: true,
  ageLevel: true,
  score: true,
  action: true,
})

const CardAgeEntity = BaseCardEntity.omit({
  dangerous: true,
  pick: true,
  score: true,
  action: true,
})

export type CardEntity = z.infer<typeof BaseCardEntity>
export type CardKnowledge = z.infer<typeof CardKnowledgeEntity>
export type CardSkill = z.infer<typeof CardSkillEntity>
export type CardDangerous = z.infer<typeof CardDangerousEntity>
export type CardAge = z.infer<typeof CardAgeEntity>

export {
  BaseCardEntity,
  CardKnowledgeEntity,
  CardSkillEntity,
  CardDangerousEntity,
  CardAgeEntity,
}

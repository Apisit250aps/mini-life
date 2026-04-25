import * as field from '@aps/next-api/entities'
import { z } from 'zod'

const CARD_TYPE = ['KNOWLEDGE', 'SKILL', 'DANGEROUS', 'AGE'] as const
const CARD_ACTION = [
  'HEALTH_ONE',
  'HEALTH_TWO',
  'PICK_ONE',
  'PICK_TWO',
  'DESTROY',
  'MULTIPLY',
  'COPY',
  'REDUCE',
  'SORT',
  'EXCHANGE_ONE',
  'EXCHANGE_TWO',
  'SWAP',
  // for age card
  'HURT_ONE',
  'HURT_TWO',
  'ZERO',
  'STOP',
] as const
const CARD_MODE = ['NORMAL', 'HARD'] as const
const BaseCardEntity = field.BaseEntity({
  // general
  /* title card */
  title: field.StringField(),
  unit: field.NumberField().default(1).unwrap(),
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
  //
  score: field.NumberField().default(0).unwrap().optional(),
  // knowledge and skill and age
  action: field
    .EnumField(...CARD_ACTION)
    .nullable()
    .default(null)
    .unwrap()
    .optional(),
  token: field.NumberField().min(1).max(2).default(1).unwrap().optional(),
  mode: field
    .EnumField(...CARD_MODE)
    .default('NORMAL')
    .unwrap()
    .optional(),
})

const CardKnowledgeEntity = BaseCardEntity.omit({
  mode: true,
  dangerous: true,
  pick: true,
})

const CardSkillEntity = BaseCardEntity.omit({
  mode: true,
  dangerous: true,
  pick: true,
})

const CardDangerousEntity = BaseCardEntity.omit({
  mode: true,
  score: true,
  action: true,
})

const CardAgeEntity = BaseCardEntity.omit({
  dangerous: true,
  pick: true,
})

export type CardEntity = z.infer<typeof BaseCardEntity>
export type CardKnowledge = z.infer<typeof CardKnowledgeEntity>
export type CardSkill = z.infer<typeof CardSkillEntity>
export type CardDangerous = z.infer<typeof CardDangerousEntity>
export type CardAge = z.infer<typeof CardAgeEntity>

const CardFormSchema = BaseCardEntity.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  pick: z.coerce.number().nullable().default(null).optional(),
  dangerous: z
    .array(z.coerce.number().min(0).max(10))
    .length(3)
    .default([0, 0, 0])
    .optional(),
  unit: z.coerce.number().default(1).optional(),
  score: z.coerce.number().default(0).optional(),
  token: z.coerce.number().min(1).max(2).default(1).optional(),
  mode: z.enum(CARD_MODE).default('NORMAL').optional(),
})
export type CardFormInput = z.input<typeof CardFormSchema>
export type CardFormValues = z.output<typeof CardFormSchema>

export {
  BaseCardEntity,
  CardKnowledgeEntity,
  CardSkillEntity,
  CardDangerousEntity,
  CardAgeEntity,
  CardFormSchema,
}

namespace MiniLifeService;

enum CardType {
  KNOWLEDGE: "KNOWLEDGE",
  SKILL: "SKILL",
  DANGEROUS: "DANGEROUS",
  AGE: "AGE",
}

model Card extends BaseEntity {
  title: string;
  card: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  age?: int32 | null;
  ageLevel?: int32 | null;
}

model CreateCardRequest {
  title: string;
  card?: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  age?: int32 | null;
  ageLevel?: int32 | null;
}

model UpdateCardRequest {
  title?: string;
  card?: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  age?: int32 | null;
  ageLevel?: int32 | null;
}

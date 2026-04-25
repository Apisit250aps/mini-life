namespace MiniLifeService;

enum CardType {
  KNOWLEDGE: "KNOWLEDGE",
  SKILL: "SKILL",
  DANGEROUS: "DANGEROUS",
  AGE: "AGE",
}


enum CardMode {
  NORMAL: "NORMAL",
  HARD: "HARD",
}

model Card extends BaseEntity {
  title: string;
  unit: int32;
  card: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  mode?: CardMode;
}

model CreateCardRequest {
  title: string;
  unit?: int32;
  card?: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  mode?: CardMode;
}

model UpdateCardRequest {
  title?: string;
  unit?: int32;
  card?: CardType;
  pick?: int32 | null;
  dangerous?: [int32, int32, int32];
  score?: int32;
  action?: string | null;
  token?: 1 | 2;
  mode?: CardMode;
}

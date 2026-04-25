namespace MiniLifeService;

enum CardType {
  KNOWLEDGE: "KNOWLEDGE",
  SKILL: "SKILL",
  DANGEROUS: "DANGEROUS",
  AGE: "AGE",
}

enum CardAction {
  HEALTH_ONE: "HEALTH_ONE",
  HEALTH_TWO: "HEALTH_TWO",
  PICK_ONE: "PICK_ONE",
  PICK_TWO: "PICK_TWO",
  DESTROY: "DESTROY",
  MULTIPLY: "MULTIPLY",
  COPY: "COPY",
  REDUCE: "REDUCE",
  SORT: "SORT",
  EXCHANGE_ONE: "EXCHANGE_ONE",
  EXCHANGE_TWO: "EXCHANGE_TWO",
  SWAP: "SWAP",
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
  action?: CardAction | null;
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
  action?: CardAction | null;
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
  action?: CardAction | null;
  token?: 1 | 2;
  mode?: CardMode;
}

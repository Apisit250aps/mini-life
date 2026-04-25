namespace MiniLifeService;

model User extends BaseEntity {
  name: string;
  email: string;
  password?: string | null;
  isActive: boolean;
  isAdmin: boolean;
  lastLogin?: utcDateTime | null;
}

model CreateUserRequest {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  isAdmin?: boolean;
  lastLogin?: utcDateTime | null;
}

model UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string | null;
  isActive?: boolean;
  isAdmin?: boolean;
  lastLogin?: utcDateTime | null;
}

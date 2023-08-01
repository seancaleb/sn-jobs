export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  exp: number;
  userId: string;
};

export type Role = "user" | "employer" | "admin";

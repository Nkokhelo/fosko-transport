export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface AppUser {
  email: string;
  emailVerified: string;
  isAdmin: boolean;
}

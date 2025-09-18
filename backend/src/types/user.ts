export interface User {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

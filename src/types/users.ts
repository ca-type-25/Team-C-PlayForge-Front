export interface User {
  _id?: string;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  password?: string;
  age?: number;
  bio?: string;
  avatar?: string;
  role?: 'USER' | 'ADMIN';
  comments?: string[];
  reviews?: string[];
}

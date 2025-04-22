
export interface JwtPayload {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'ADMIN' | 'user' | 'USER'; 
  }
  
export interface AuthContextType {
  user: JwtPayload | null;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}
export interface Game {
    id: string;
    title: string;
    coverImageUrl?: string;
    releaseYear?: number;
  }
  
  export interface GameStudio {
    id: string;
    name: string;
    logoUrl?: string;
    description?: string;
    foundedYear?: number;
    headquarters?: string;
    website?: string;
    games: Game[];
  }
  
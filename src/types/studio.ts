
export interface Studio {
    _id: string;
    name: string;
    description: string;
    year: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    games: Game[];
  }
  
  export interface Game {
    _id: string;
    title: string;
    description: string;
    studio: string;
    release: number;
    cover: string;
    video: string;
    rating: number;
    genres: string[];
    createdAt: string;
    updatedAt: string;
  }

  export interface SelectOption {
    value: string;
    label: string;
  }
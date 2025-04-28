interface Game {
    _id: string
    title: string
    description: string
    studio: {
        _id: string
        name: string
    }
    release: number
    cover: string
    video: string
    rating: number
    genres: Genre[]
    reviews: Review[]
}

export default Game

export interface Genre {
    _id: string,
    title:string
}

export interface Review {
    _id: string,
    title: string,
    content: string,
    rating: number,
    game: Game
}
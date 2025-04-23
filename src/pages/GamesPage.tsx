import { useEffect, useState } from "react"
import { Link } from "react-router"
import api from "../api"

interface Genre {
    _id: string,
    title:string
}

interface Game {
    _id: string
    title: string
    description: string
    studio: string
    release: number
    cover: string
    video: string
    rating: number
    genres: Genre[]
}


const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data } = await api.get('/games')

                setGames(data)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error)
                } else {
                    setError(new Error("Unknown error"))
                }
            } finally {
                setLoading(false)
            }
        }

        fetchGames()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>Games</h1>
            {games.map(game => {
                return (
                    <div key={game._id}>
                        <img src={game.cover} alt={game.title} style={{width: "200px", height: "200px", objectFit: "cover"}} />
                        <div>
                            <Link to={`/games/${game._id}`}>{game.title}</Link>
                            <p>Rating: {game.rating}</p>
                            <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
                            <span>{game.release}</span>
                        </div>
                    </div>
                )
            })}
            <button><Link to='/games/create'>Add new game</Link></button>
        </div>
    )
}

export default GamesPage
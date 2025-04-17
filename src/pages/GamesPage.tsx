import { useEffect, useState } from "react"
import { Link } from "react-router"
import api from "../api"

interface Game {
    _id: string
    title: string
    description: string
    studio: string
    release: number
    cover: string
    video: string
    rating: number
    genres: string[]
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
            <ul>
                {games.map(game => (
                    <li key={game._id}>
                        <Link to={`/games/${game._id}`}>{game.title}</Link>
                    </li>
                ))}
            </ul>
            <button><Link to='/games/create'>Add new game</Link></button>
        </div>
    )
}

export default GamesPage
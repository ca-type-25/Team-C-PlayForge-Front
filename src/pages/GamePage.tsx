import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../api"


interface Genre {
    _id: string,
    title:string
}

interface Studio {
    _id: string,
    name:string
}

interface Game {
    _id: string
    title: string
    description: string
    studio: Studio
    release: number
    cover: string
    video: string
    rating: number
    genres: Genre[]
}

const GamePage = () => {
    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data } = await api.get(`/games/${id}`)

                setGame(data)
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
        fetchGame()
    }, [id])

    useEffect(() => {
        if (game) {
            console.log("Game genres:", game.genres)
        }
    }, [game])

    const deleteHandler = () => {
        api.delete(`/games/${id}`)
        navigate('/games')

    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!game) {
        return <div>No game found.</div>
    }

    return (
        <div>
            <h1>{game.title}</h1>
            <img src={game.cover} alt={game.title} />
            <p>{game.description}</p>
            <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
            <p><Link to={`/studios/${game.studio._id}`}>{game.studio.name}</Link> Studio: {game.studio.name}</p>
            <p>Release date: {game.release}</p>
            {game.video ? (
                <iframe src={game.video} style={{ border: "none" }}></iframe>
            ) : (
                <p>Video unavailable</p>
            )}
            <button><Link to={`/games/edit/${game._id}`}>Edit game</Link></button>
            <button onClick={deleteHandler}>Delete</button>
            <button><Link to={`/games`}>Back to games list</Link></button>
        </div>
    )
}

export default GamePage
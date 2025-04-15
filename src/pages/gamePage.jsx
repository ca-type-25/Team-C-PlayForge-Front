import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../api"

const GamePage = () => {
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data } = await api.get(`/games/${id}`)

                setGame(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchGame()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>{game.title}</h1>
        </div>
    )
}

export default GamePage
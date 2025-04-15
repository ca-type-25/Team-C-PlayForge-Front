import { useEffect, useState } from "react"
import { Link } from "react-router"
import api from "../api"
import ReviewForm from "../components/ReviewForm"

const GamesPage = () => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect(() => {
    //     const fetchGames = async () => {
    //         try {
    //             const { data } = await api.get('/games')

    //             setGames(data)
    //         } catch (error) {
    //             setError(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchGames()
    // }, [])

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>
    // }

    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map(game => (
                    <li>
                        <Link to={`/games/${game._id}`}>{game.title}</Link>
                    </li>
                ))}
            </ul>
            <ReviewForm />
        </div>
    )
}

export default GamesPage
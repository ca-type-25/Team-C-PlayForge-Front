import { useEffect, useState } from "react"
import api from "../../api"
import { Link } from "react-router"

interface Game {
    _id: string,
    title: string,
    cover: string
}

interface Review {
    _id: string,
    rating: number,
    feedback: string,
    user: string,
    game: {
        _id: string,
        title: string
    }
}

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchReviews =async () => {
            try {
                const { data } = await api.get('/reviews')
                const gamesResponse = await api.get(`/games`)

                console.log("Fetched reviews:", data); // Debugging
                console.log("Fetched games:", gamesResponse.data); // Debugging

                setReviews(data)
                setGames(gamesResponse.data)
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
        fetchReviews()
    }, [])

    

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div>
            <h1>Reviews</h1>
            {reviews.map(review => {
                const game = games.find(game => game._id === review.game._id)
                return (
                    <div key={review._id}>
                        <Link to={`/reviews/${review._id}`}>
                            {game?.cover && (
                                <img src={game.cover} alt="Game Cover" style={{width: '80px', height: '80px'}} />
                            )}
                            Game: {game?.title || "Unknown Game"}
                        </Link>
                    </div>
                )
            })}
            <Link to='/reviews/create'>Add new review</Link>
        </div>
    )
}

export default ReviewsPage
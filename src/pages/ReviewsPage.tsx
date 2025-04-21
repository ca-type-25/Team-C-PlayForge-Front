import { useEffect, useState } from "react"
import api from "../api"
import { Link } from "react-router"

interface Game {
    _id: string,
    cover: string
}

interface Review {
    _id: string,
    rating: number,
    feedback: string,
    username: string,
    game: string
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
                const game = games.find(game => game._id === review.game)
                return (
                    <div key={review._id}>
                        <Link to={`/reviews/${review._id}`}>
                            User: {review.username}
                            {game?.cover && (
                                <img src={game.cover} alt="Game Cover" style={{width: '80px', height: '80px'}} />
                            )}
                        </Link>
                    </div>
                )
            })}
            <button><Link to='/reviews/create'>Add new review</Link></button>
        </div>
    )
}

export default ReviewsPage
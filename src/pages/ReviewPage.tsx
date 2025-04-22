import { useEffect, useState } from "react"
import api from "../api"
import { Link, useNavigate, useParams } from "react-router"

interface Game {
    _id: string,
    title: string
}

interface Review {
    _id: string,
    rating: number,
    feedback: string,
    user: string,
    game: string,
    createdAt: string
}

const ReviewPage = () => {
    const [review, setReview] = useState<Review | null>(null)
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data } = await api.get(`/reviews/${id}`)
                const gamesResponse = await api.get(`/games`)

                setReview(data)
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
        fetchReview()
    }, [id])

    const deleteHandler = () => {
        api.delete(`/reviews/${id}`)
        navigate('/reviews')

    }

    const gameTitle = games.find(game => game._id === review?.game)?.title

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!review) {
        return <div>No review found.</div>
    }

    return (
        <div>
            <h1>Review</h1>

            <div>Rating: {review.rating}</div>
            <p>Feedback: {review.feedback}</p>
            <p>Posted: {new Date(review.createdAt).toLocaleDateString()}</p>
            <div>Reviewed Game: {gameTitle}</div>

            <button><Link to={`/reviews/edit/${review._id}`}>Edit review</Link></button>
            <button onClick={deleteHandler}>Delete</button>
            <button><Link to={`/reviews`}>Back to reviews list</Link></button>
        </div>
    )
}

export default ReviewPage
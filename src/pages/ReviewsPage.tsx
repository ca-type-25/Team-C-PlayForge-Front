import { useEffect, useState } from "react"
import api from "../api"
import { Link } from "react-router"

interface Review {
    _id: string,
    rating: number,
    feedback: string,
    user: string,
    game: string
}

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchReviews =async () => {
            try {
                const { data } = await api.get('/reviews')

                setReviews(data)
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
            {reviews.map(review => (
                <div key={review._id}>
                    <Link to={`/reviews/${review._id}`}>Review id: {review._id}</Link>
                </div>
            ))}
            <button><Link to='/reviews/create'>Add new review</Link></button>
        </div>
    )
}

export default ReviewsPage
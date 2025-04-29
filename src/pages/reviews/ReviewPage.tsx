import { useEffect, useState } from "react"
import api from "../../api"
import { Link, useNavigate, useParams } from "react-router"


interface Review {
    _id: string,
    rating: number,
    feedback: string,
    user: string,
    game: {
        _id: string
        title: string
    },
    createdAt: string
}

const ReviewPage = () => {
    const [review, setReview] = useState<Review | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data } = await api.get(`/reviews/${id}`)

                setReview(data)
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
            <div>Reviewed Game: {review.game?.title || "Game not found"} </div>

            <Link to={`/reviews/edit/${review._id}`}>Edit review</Link>
            <button onClick={deleteHandler}>Delete</button>
            <Link to={`/reviews`}>Back to reviews list</Link>
        </div>
    )
}

export default ReviewPage
import { useEffect, useState } from "react"
import api from "../../api"
import { Link, useNavigate } from "react-router"
import styles from './ReviewsPage.module.scss'


interface Review {
    _id: string,
    rating: number,
    feedback: string,
    user: {
        _id: string;
        name: string;
        avatar: string
    },
    game: {
        _id: string,
        title: string
    }
}

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const navigate = useNavigate()

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

    const deleteHandler = async (reviewId: string) => {
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId)); 
            navigate("/reviews");
        } catch (error) {
            console.error("Error deleting the review:", error);
        }
    };

    

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div className={styles['page-container']}>
            <div>
                <h1>Reviews</h1>
                {reviews.map(review => (
                    <div key={review._id} >
                        <Link to={`/reviews/${review._id}`} className={styles['review-item']}>
                            {review.user ? (
                                <div className={styles['user-info']}>
                                    <p><strong>{review.user.name}</strong></p>
                                </div>
                            ) : (
                                <p><strong>Unknown User</strong></p>
                            )}
                            <p>Reviewed Game: {review.game.title}</p>
                            <p><strong>Feedback:</strong> {review.feedback}</p>
                        </Link>
                        <button onClick={() => deleteHandler(review._id)} className={styles["delete-review-button"]}>Delete review</button>
                    </div>
                    
                ))}
                
            </div>
            <Link to='/reviews/create' className={styles['add-review']}>Add new review</Link>
        </div>
    )
}

export default ReviewsPage
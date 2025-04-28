import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../../api"
import { useGames } from "../../contexts/GamePageContext"
import styles from './GamePage.module.scss'

interface Review {
    _id: string
    rating: number
    feedback: string
    createdAt: string
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}


const GamePage = () => {
    const { game, loading, error, fetchGameById } = useGames()
    const { id } = useParams()

    const navigate = useNavigate()

    const [reviews, setReviews] = useState<Review[]>([])

    const fetchReviews = async (gameId: string) => {
        try {
            const { data } = await api.get(`/reviews/game/${gameId}`)
            console.log("Fetched reviews:", data)
            setReviews(data)
        } catch (error) {
            console.error("Failed to fetch reviews", error)
        }
    }


    const deleteHandler = async () => {
        try {
            await api.delete(`/games/${id}`);
            navigate("/games");
        } catch (error) {
            console.error("Error deleting the game:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchGameById(id)
            fetchReviews(id)
        }
    }, [id, fetchGameById])

    const renderStars = (rating: number) => {
        const maxStars = 5 
        const filledStars = Math.round(rating)
        const emptyStars = maxStars - filledStars
    
        return (
            <>
                {Array(filledStars).fill("★").map((star, index) => (
                    <span key={`filled-${index}`} className={styles["filled-star"]}>{star}</span>
                ))}
                {Array(emptyStars).fill("☆").map((star, index) => (
                    <span key={`empty-${index}`} className={styles["empty-star"]}>{star}</span>
                ))}
            </>
        );
    };

    const calculateAverageRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0; 
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length; 
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!game) {
        return <div>No game found.</div>
    }

    return (
        <div className={styles['page-container']}>
            <div className={styles["action-buttons"]}>
                <Link to={`/games/edit/${game._id}`} className={styles["edit-button"]}>Edit game</Link>
                <button onClick={deleteHandler} className={styles["delete-button"]}>Delete</button>
            </div>
            <h1>{game.title}</h1>
            <div className={styles["game-card"]}>
                <div>
                    {game.video ? (
                        <iframe src={game.video} className={styles["video-card"]}></iframe>
                    ) : (
                        <p>Video unavailable</p>
                    )}
                </div>
                <div>
                    <img src={game.cover} alt={game.title} className={styles['game-cover']} />
                    <p>{game.description}</p>
                    <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
                    <p>Release date: {game.release}</p>
                    <Link to={`/studios/${game.studio._id}`} className={styles['studio-name']}>Studio: {game.studio.name}</Link>
                </div>
            </div>
            <div className={styles['reviews-container']}>
                <h2>Reviews</h2>
                <div>
                    <h3>Average Rating: {renderStars(calculateAverageRating(reviews))}</h3>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review._id} className={styles["review-card"]}>
                                <div className={styles["user-avatar"]}>
                                    <img src="" alt="" />
                                </div>
                                <p className={styles["rating-stars"]}>{renderStars(review.rating)}</p>
                                <span className={styles["date-posted"]}>Posted: {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' }).format(new Date(review.createdAt))}</span>
                                <p>{review.feedback}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
                <Link to={`/reviews/create?gameId=${game._id}`} className={styles["add-review-button"]}>Add a review</Link>
            </div>

        </div>
    )
}

export default GamePage
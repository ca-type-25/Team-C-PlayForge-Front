import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../../api"
import { useGames } from "../../contexts/GamePageContext"

interface Review {
    _id: string
    rating: number
    feedback: string
    createdAt: string
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
        <div>
            <h1>{game.title}</h1>
            <div>
                {game.video ? (
                    <iframe src={game.video} style={{ border: "none" }}></iframe>
                ) : (
                    <p>Video unavailable</p>
                )}
            </div>
            <img src={game.cover} alt={game.title} style={{width:"200px"}} />
            <div>
                <p>{game.description}</p>
                <p>Genre: {game.genres.map(genre => genre.title).join(', ')}</p>
                <p>Release date: {game.release}</p>
                <Link to={`/studios/${game.studio._id}`}>Studio: {game.studio.name}</Link>
            </div>
            <div>
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id}>
                            <p>Rating: {review.rating}</p>
                            <p>Feedback: {review.feedback}</p>
                            <p>Created at: {new Date(review.createdAt).toLocaleDateString()}</p>
                            <Link to={`/reviews/${review._id}`}>View review</Link>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
            <div>
                <Link to={`/games/edit/${game._id}`}>Edit game</Link>
                <button onClick={deleteHandler}>Delete</button>
                <Link to={`/games`}>Back to games list</Link>
                <Link to={`/reviews/create?gameId=${game._id}`}>Add review</Link>
            </div>
        </div>
    )
}

export default GamePage
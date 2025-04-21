import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router"

interface Game {
    _id: string,
    title: string
}


type ReviewFormProps = {
    editReviewData?: {
        _id: string,
        rating: number,
        feedback: string,
        user: string,
        game: string
    }
}

function ReviewForm(props: ReviewFormProps) {

    const { editReviewData } = props

    const [rating, setRating] = useState('')
    const [feedback, setFeedback] = useState('')
    const [games, setGames] = useState<Game[]>([])
    const [selectedGame, setSelectedGame] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchGames = async () => {
            const res = await api.get(`/games`)
            const gamesData = res.data

            setGames(gamesData)
            setSelectedGame(gamesData[0]._id || '')
            
        }
        fetchGames()

    }, [])


    const feedbackHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(event.target.value)
    const selectedGameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedGame(event.target.value)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newReview = {
            rating: Number(rating),
            feedback,
            game: selectedGame
        }

        if (editReviewData) {
            const { data } = await api.put(`/reviews/${editReviewData._id}`, newReview)
            navigate(`/reviews/${data._id}`)
        } else {
            const { data } = await api.post(`/reviews`, newReview)
            navigate(`/reviews/${data._id}`)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="rating">Rating</label>
                    <div style={{ fontSize: "30px" }}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <span
                                key={num}
                                style={{
                                    cursor: "pointer",
                                    color: Number(rating) >= num ? "#646cffaa" : "#e4e5e9",
                                }}
                                onClick={() => setRating(num.toString())}
                            >
                                ★
                            </span>
                        ))}
                        <span style={{ marginLeft: "0.5rem" }}></span>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="feedback">Feedback</label>
                    <textarea name="feedback" id="feedback" value={feedback} onChange={feedbackHandler}></textarea>
                </div>
                <div className="form-control">
                    <label htmlFor="game">Game</label>
                    <select value={selectedGame} onChange={selectedGameHandler}>
                        {games.map(game => (
                            <option key={game._id} value={game._id}>{game.title}

                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">
                    {editReviewData ? 'Edit Review' : 'Add new review'}
                </button>
            </form>
        </div>
    )
}

export default ReviewForm
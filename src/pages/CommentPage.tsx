import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../api"

interface Topic {
    _id: string, 
    title: string
}

interface Comment {
    _id: string,
    message: string,
    picture: string,
    topics: Topic[],
    user: string[]
}

const CommentPage = () => {
    const [comment, setComment] = useState<Comment | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const { data } = await api.get(`/comments/${id}`)

                setComment(data)
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
        fetchComment()
    }, [id])

    const deleteHandler = () => {
        api.delete(`/comments/${id}`)
        navigate('/comments')

    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!comment) {
        return <div>No comment found.</div>
    }

    return (
        <div>
            <h1>Comment:</h1>
            <img src={comment.picture} alt="Comment picture" />
            <p>{comment.message}</p>
            <p>Topic: {comment.topics.map(topic => topic.title).join(', ')}</p>
            <p>User: {comment.user}</p>
            <button><Link to={`/comments/edit/${comment._id}`}>Edit comment</Link></button>
            <button onClick={deleteHandler}>Delete</button>
            <button><Link to={`/comments`}>Back to comments list</Link></button>
            <button><Link to={`/comments/create`}>Add comment</Link></button>
        </div>
    )
}

export default CommentPage
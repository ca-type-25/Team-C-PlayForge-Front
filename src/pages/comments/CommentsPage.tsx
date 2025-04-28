import { useEffect, useState } from "react"
import { Link } from "react-router"
import api from "../../api"

interface Comment {
    _id: string,
    message: string,
    picture: string,
    topic: string[],
    user: string[]
}

const CommentsPage = () => {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await api.get('/comments')

                setComments(data)
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

        fetchComments()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>
                        <Link to={`/comments/${comment._id}`}>{comment.message}</Link>
                    </li>
                ))}
            </ul>
            <Link to='/comments/create'>Add new comment</Link>
        </div>
    )
}

export default CommentsPage
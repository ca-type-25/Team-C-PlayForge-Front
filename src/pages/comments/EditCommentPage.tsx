import { useEffect, useState } from "react";
import api from "../../api"
import { Link, useParams } from "react-router";
import { AxiosError } from "axios"
import CommentForm from "../../components/CommentForm";


type CommentFormProps = {
    editCommentData?: {
        _id: string,
        message: string,
        picture: string,
        topic: string,
        user: string
    }
}

function EditCommentPage() {
    const [comment, setComment] = useState<CommentFormProps["editCommentData"] | null>(null)
    const [error, setError] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            

            try {
                const { data } = await api.get(`/comments/${id}`)
                setComment(data)
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error)
                    setError(error.message)
                } else {
                    setError('Unexpected error')
                }
            }
        }
        fetchData()
    }, [id])


    if (error) {
        return <p>{error}</p>
    }

    if (!comment) {
        return "Loading..."
    }

    return (
        <div>
            <h1>Edit comment: {comment.message}</h1>
            
            <CommentForm editCommentData={comment}/>

            <Link to={`/comments`}>Back to comments list</Link>
        </div>
    )
}

export default EditCommentPage
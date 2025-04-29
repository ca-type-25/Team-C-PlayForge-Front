import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import api from "../../api"
import ReviewForm from "../../components/ReviewForm"
import { AxiosError } from "axios"

type ReviewFormProps = {
    _id: string,
    rating: number,
    feedback: string,
    user: string,
    game: string,
    editReviewData?: {
        _id: string,
        rating: number,
        feedback: string,
        user: string,
        game: string
    }
}

function EditReviewPage() {
    const [review, setReview] = useState<ReviewFormProps["editReviewData"] | null>(null)
    const [error, setError] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data } = await api.get(`/reviews/${id}`)
                setReview(data)
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

    if (!review) {
        return "Loading..."
    }

    return(
        <div>
            <h1>Edit Review: {review._id}</h1>
            
            <ReviewForm editReviewData={review}/>

            <Link to={`/reviews`}>Back to reviews list</Link>
        </div>
    )
}
export default EditReviewPage
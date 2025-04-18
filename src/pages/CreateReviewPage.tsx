import { Link } from "react-router"
import ReviewForm from "../components/ReviewForm"


function CreateReviewPage() {
    
    return (
        <div>
            <h1>Add New Review</h1>
            <ReviewForm />
            <button><Link to={`/reviews`}>Back to reviews list</Link></button>
        </div>
    )
}

export default CreateReviewPage
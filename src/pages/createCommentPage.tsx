import { Link } from "react-router"
import CommentForm from "../components/CommentForm"


function CreateCommentPage() {
    
    return (
        <div>
            <h1>Add New Comment</h1>
            <CommentForm />
            <button><Link to={`/comments`}>Back to comments list</Link></button>
        </div>
    )
}

export default CreateCommentPage
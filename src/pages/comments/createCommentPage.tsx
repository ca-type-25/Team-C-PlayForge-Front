import { Link } from "react-router"
import CommentForm from "../../components/CommentForm"


function CreateCommentPage() {
    
    return (
        <div>
            <h1>Add New Comment</h1>
            <CommentForm />
            <Link to={`/comments`}>Back to comments list</Link>
        </div>
    )
}

export default CreateCommentPage
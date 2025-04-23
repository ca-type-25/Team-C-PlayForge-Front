import { Link } from "react-router"
import GenreForm from "../components/genreComponents/GenreForm"



function CreateGenrePage() {
    
    return (
        <div>
            <h1>Add New genre</h1>
            <GenreForm />
            <button><Link to={`/genres`}>Back to genres list</Link></button>
        </div>
    )
}

export default CreateGenrePage
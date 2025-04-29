import { Link } from "react-router"
import GameForm from "../../components/gameComponents/GameForm";


function CreateGamePage() {
    
    return (
        <div>
            <h1>Add New Game</h1>
            <GameForm />
            <Link to={`/games`}>Back to games list</Link>
        </div>
    )
}

export default CreateGamePage
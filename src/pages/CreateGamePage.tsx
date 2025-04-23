import { Link } from "react-router"
import GameForm from "../components/gameComponents/GameForm";


function CreateGamePage() {
    
    return (
        <div>
            <h1>Add New Game</h1>
            <GameForm />
            <button><Link to={`/games`}>Back to games list</Link></button>
        </div>
    )
}

export default CreateGamePage
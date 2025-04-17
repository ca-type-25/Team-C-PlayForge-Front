import { useEffect, useState } from "react";
import GameForm from "../components/GameForm";
import api from "../api";
import { Link, useParams } from "react-router";
import { AxiosError } from "axios"

type GameFormProps = {
    title: string,
    cover: string,
    genres: string[],
    description: string,
    studio: string,
    release: string,
    video: string,
    editGameData?: {
        _id: string,
        title: string,
        cover: string,
        genre: string[],
        description: string,
        studio: string,
        release: string,
        video: string,
    }

}

function EditGamePage() {
    const [game, setGame] = useState<GameFormProps["editGameData"] | null>(null)
    const [error, setError] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            

            try {
                const { data } = await api.get(`/games/${id}`)
                setGame(data)
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

    if (!game) {
        return "Loading..."
    }

    return (
        <div>
            <h1>Edit Game: {game.title}</h1>
            
            <GameForm editGameData={game}/>

            <button><Link to={`/games`}>Back to games list</Link></button>
        </div>
    )
}

export default EditGamePage
import { useEffect, useState } from "react";
import api from "../../api";
import { Link, useParams } from "react-router";
import { AxiosError } from "axios"
import GenreForm from "../../components/genreComponents/GenreForm";


type GenreFormProps = {
    editGenreData?: {
        _id: string,
        title: string,
        description: string
    }
}

function EditGenrePage() {
    const [genre, setGenre] = useState<GenreFormProps["editGenreData"] | null>(null)
    const [error, setError] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`/genres/${id}`)
                setGenre(data)
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

    if (!genre) {
        return "Loading..."
    }

    return (
        <div>
            <h1>Edit genre: {genre.title}</h1>
            
            <GenreForm editGenreData={genre}/>

            <Link to={`/genres`}>Back to genres list</Link>
        </div>
    )
}

export default EditGenrePage
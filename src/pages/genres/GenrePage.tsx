import { useEffect, useState } from "react"
import api from "../../api"
import { Link, useNavigate, useParams } from "react-router"

interface Genre {
    _id: string,
    title: string,
    description: string
}

const GenrePage = () => {
    const [genre, setGenre] = useState<Genre | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const { data } = await api.get(`/genres/${id}`)

                setGenre(data)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error)
                } else {
                    setError(new Error("Unknown error"))
                }
            } finally {
                setLoading(false)
            }
        }
        fetchGenre()
    }, [id])

    const deleteHandler = () => {
        api.delete(`/genres/${id}`)
        navigate('/genres')

    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!genre) {
        return <div>No genre found.</div>
    }

    return (
        <div>
            <h1>Genre</h1>

            <div>Title: {genre.title}</div>
            <p>Description: {genre.description}</p>

            <button><Link to={`/genres/edit/${genre._id}`}>Edit genre</Link></button>
            <button onClick={deleteHandler}>Delete</button>
            <Link to={`/genres`}>Back to genres list</Link>
        </div>
    )
}

export default GenrePage
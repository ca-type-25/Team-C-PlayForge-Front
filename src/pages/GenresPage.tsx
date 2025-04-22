import { useEffect, useState } from "react"
import api from "../api"
import { Link } from "react-router"

interface Genre {
    _id: string,
    title: string,
    description: string
}

const GenresPage = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchGenres =async () => {
            try {
                const { data } = await api.get('/genres')

                setGenres(data)
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
        fetchGenres()
    }, [])

    

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div>
            <h1>Genres</h1>
            {genres.map(genre => {
                return (
                    <div key={genre._id}>
                        <Link to={`/genres/${genre._id}`}>{genre.title}</Link>
                    </div>
                )
            })}
            <button><Link to='/genres/create'>Add new genre</Link></button>
        </div>
    )
}

export default GenresPage
import { useNavigate } from "react-router";
import api from "../../api"
import { useEffect, useState } from "react"

type Genre = {
    _id: string;
    title: string;
    description?: string;
}

interface Studio {
    _id: string,
    name:string
}

type GameFormProps = {
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

function GameForm(props: GameFormProps) {

    const { editGameData } = props

    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenre, setSelectedGenre] = useState('')
    const [description, setDescription] = useState('')
    const [studios, setStudios] = useState<Studio[]>([])
    const [selectedStudio, setSelectedStudio] = useState('')
    const [release, setRelease] = useState('')
    const [video, setVideo] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await api.get(`/genres`)
            const genresData = res.data

            setGenres(genresData)
            setSelectedGenre(genresData[0]._id || '')
            
        }
        fetchGenres()

    }, [])

    useEffect(() => {
        const fetchStudios = async () => {
            const res = await api.get(`/studios`)
            const studiosData = res.data

            setStudios(studiosData)
            setSelectedStudio(studiosData[0]._id || '')
            
        }
        fetchStudios()

    }, [])


    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
    const coverHandler = (event: React.ChangeEvent<HTMLInputElement>) => setCover(event.target.value)
   
    const selectedGenreHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedGenre(event.target.value)

    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

    const selectedStudioHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudio(event.target.value)

    const releaseHandler = (event: React.ChangeEvent<HTMLInputElement>) => setRelease(event.target.value)
    const videoHandler = (event: React.ChangeEvent<HTMLInputElement>) => setVideo(event.target.value)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newGame = {
            title,
            cover,
            genre: [selectedGenre],
            description,
            studio: selectedStudio,
            release,
            video
        }

        if (editGameData) {
            const { data } = await api.put(`/games/${editGameData._id}`, newGame)
            navigate(`/games/${data._id}`)
        } else {
            const { data } = await api.post(`/games`, newGame)
            navigate(`/games/${data._id}`)
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={titleHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="cover">Cover</label>
                    <input type="text" name="cover" id="cover" value={cover} onChange={coverHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="genre">Genre</label>
                    <select value={selectedGenre} onChange={selectedGenreHandler}>
                        {genres.map(genre => (
                            <option key={genre._id} value={genre._id}>{genre.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={description} onChange={descriptionHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="studio">Studio</label>
                    <select value={selectedStudio} onChange={selectedStudioHandler}>
                        {studios.map(studio => (
                            <option key={studio._id} value={studio._id}>{studio.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="release">Release</label>
                    <input type="text" name="release" id="release" value={release} onChange={releaseHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="video">Video</label>
                    <input type="text" name="video" id="video" value={video} onChange={videoHandler}/>
                </div>
                <button type="submit">
                    {editGameData ? 'Edit Game' : 'Add new game'}
                </button>
            </form>
        </div>
    )
}

export default GameForm
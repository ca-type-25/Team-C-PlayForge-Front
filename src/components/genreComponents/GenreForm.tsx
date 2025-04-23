import { useState } from "react"
import api from "../../api"
import { useNavigate } from "react-router"


type GenreFormProps = {
    editGenreData?: {
        _id: string,
        title: string,
        description: string
    }
}

function GenreForm(props: GenreFormProps) {

    const { editGenreData } = props

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newGenre = {
            title,
            description
        }

        if (editGenreData) {
            const { data } = await api.put(`/genres/${editGenreData._id}`, newGenre)
            navigate(`/genres/${data._id}`)
        } else {
            const { data } = await api.post(`/genres`, newGenre)
            navigate(`/genres/${data._id}`)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" id="title" value={title} onChange={titleHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="description">description</label>
                    <input type="text" name="description" id="description" value={description} onChange={descriptionHandler}/>
                </div>
                <button type="submit">
                    {editGenreData ? 'Edit Genre' : 'Add new genre'}
                </button>
            </form>
        </div>
    )
}

export default GenreForm
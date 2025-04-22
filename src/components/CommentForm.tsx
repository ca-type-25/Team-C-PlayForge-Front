import { useNavigate } from "react-router";
import api from "../api"
import { useEffect, useState } from "react"

interface Topic {
    _id: string, 
    title: string
}

interface User {
    _id: string,
    name: string
}

type CommentFormProps = {
    editCommentData?: {
        _id: string,
        message: string,
        picture: string,
        topic: string,
        user: string
    }
}

function CommentForm(props: CommentFormProps) {

    const { editCommentData } = props

    const [message, setMessage] = useState('')
    const [picture, setPicture] = useState('')

    const [topics, setTopics] = useState<Topic[]>([])
    const [selectedTopic, setSelectedTopic] = useState('')

    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTopics = async () => {
            const res = await api.get(`/topics`)
            const topicsData = res.data

            setTopics(topicsData)
            setSelectedTopic(topicsData[0]._id || '')
            
        }
        fetchTopics()

    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await api.get(`/users`)
            const usersData = res.data

            setUsers(usersData)
            setSelectedUser(usersData[0]._id || '')
            
        }
        fetchUsers()

    }, [])

    const messageHandler = (event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)

    const pictureHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPicture(event.target.value)
   
    const selectedTopicHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTopic(event.target.value)

    const selectedUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedUser(event.target.value)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newComment = {
            message,
            picture,
            topic: [selectedTopic],
            user: [selectedUser]
        }

        if (editCommentData) {
            const { data } = await api.put(`/comments/${editCommentData._id}`, newComment)
            navigate(`/comments/${data._id}`)
        } else {
            const { data } = await api.post(`/comments`, newComment)
            navigate(`/comments/${data._id}`)
        }
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="message">Message</label>
                    <input type="text" name="message" id="message" value={message} onChange={messageHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="picture">picture</label>
                    <input type="text" name="picture" id="picture" value={picture} onChange={pictureHandler}/>
                </div>
                <div className="form-control">
                    <label htmlFor="topic">Topic</label>
                    <select value={selectedTopic} onChange={selectedTopicHandler}>
                        {topics.map(topic => (
                            <option key={topic._id} value={topic._id}>{topic.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="user">User</label>
                    <select value={selectedUser} onChange={selectedUserHandler}>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">
                    {editCommentData ? 'Edit Comment' : 'Add new comment'}
                </button>
            </form>
        </div>
    )
}

export default CommentForm
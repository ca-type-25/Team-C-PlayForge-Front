import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

// Offer to use styled components, create a separate file for styled components, you can export it

const ReviewForm = () => {

    const [body, setBody] = useState('')
    const [visibility, setVisibility] = useState('')
    const [recommend, setRecommend] = useState(null)

    const VISIBILITY = [
        'public',
        'friends only'
    ]

    const bodyHandler = event => setBody(event.target.value)
    const visibilityHandler = event => setVisibility(event.target.value)

    const submitHandler = event => {
        event.preventDefault()

        const newReview = {
            body,
            visibility,
            recommend
        }

        console.log("Review Submitted:", newReview)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="body">Your Review</label>
                    <textarea 
                        name="body"
                        id="body" 
                        value={body}
                        maxLength={200} 
                        onChange={bodyHandler}>
                    </textarea>
                </div>
                <div className="form-control">
                    <label>Would you recommend this game?</label>
                    <button 
                        type="button" 
                        onClick={() => setRecommend('like')}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '0.5rem' }} />
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setRecommend('dislike')}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} style={{ marginRight: '0.5rem' }} />
                    </button>
                </div>
                <div className="form-control">
                    <label htmlFor="visibility">Visibility</label>
                    <select 
                        name="visibility" 
                        id="visibility" 
                        value={visibility} 
                        onChange={visibilityHandler}
                    >
                        {VISIBILITY.map(visibility => (
                            <option key={visibility} value={visibility}>
                                {visibility}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Post review</button>
                <button>Close</button>
            </form>
        </div>
    )
}
export default ReviewForm
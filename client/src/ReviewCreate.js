import React, {useState} from "react";
import axios from 'axios'

//we are getting the movieId from the Movie card
const ReviewCreate = ({movieId}) => {
    const [reviews, setReviews] = useState('')

    const onSubmit = async(event) => {
        event.preventDefault()
        await axios.post(`http://localhost:4001/movies/${movieId}/reviews`, {
            reviews
        })
        setReviews('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Review</label>
                <input value={reviews} onChange= {e=> setReviews(e.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default ReviewCreate
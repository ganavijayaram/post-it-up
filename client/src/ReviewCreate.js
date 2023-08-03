import React, {useState} from "react";
import axios from 'axios'

//we are getting the movieId from the Movie card
const ReviewCreate = ({movieId}) => {
    const [content, setContent] = useState('')

    const onSubmit = async(event) => {
        event.preventDefault()
        //console.log(`REVIEW ${content}`)
        await axios.post(`http://movies.com/movies/${movieId}/reviews`, {
            content,
        }).catch((err) => {
            console.log(`Error in ${err.message} ReviewCreate`);
          });
        setContent("")
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Review</label>
                <input value={content} onChange = {e=> setContent(e.target.value)} className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default ReviewCreate
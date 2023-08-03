import React, {useState} from "react";
import axios from 'axios'

const Movie = () => {
    const [title, setTitle] = useState(' ')

    const onSubmit = async (event) => {
        event.preventDefault()
        await axios.post('http://movies.com/movies/create', {
            title
        }).catch((err) => {
            console.log(`Error in ${err.message} MovieCreate`);
          });
        setTitle('')
    }
    //Creating form to create Movie
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                    value = {title} 
                    onChange = {e => setTitle(e.target.value) } 
                    className="form-control"></input>
                </div>
                <button className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Movie
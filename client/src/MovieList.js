import React, {useState, useEffect } from "react";
import axios from 'axios'
import ReviewCreate from "./ReviewCreate";
import ReviewList from "./ReviewList";

const MovieList = () => {
    //setting initial value as an object and not [] because in the movie's index, moveis is defined as an object
    const [movies, setMovies] = useState({})

    const fetchMovies = async () => {
        const res = await axios.get('http://localhost:4007/movies')
        console.log(`CLIENT ${res.data}`)
        setMovies(res.data)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    //[]tells run it only once

    //Object.values will convert an all the values in the movies to an array so that you can iterate over it
    const renderedMovies = Object.values(movies).map(movie => {
        return <div className="card" style={{width: '30%', marginBottom: '20px'}} key = {movie.id}>
            <div className="card-body">
                <h3>{movie.title}</h3>
                <ReviewList reviews={movie.reviews}/>
                <ReviewCreate movieId={movie.id} />
            </div>
        </div>
    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedMovies}
    </div>
}

export default MovieList
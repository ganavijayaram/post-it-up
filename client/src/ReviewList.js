import React, {useState, useEffect}from "react";
import axios from 'axios'


const ReviewList  = ({movieId}) => {
    const [reviews, setReviews] = useState([])

    const fetchData = async() => {
        const res = await axios.get(`http://localhost:4001/movies/${movieId}/reviews`)
        //console.log(` Result ${movieId} ${res.data.content}`)
        setReviews(res.data)
    }

    useEffect(() => {
        fetchData();
    }, [])
   
    const renderedReviews = reviews.map(review => {
        //console.log(`reviewId ${review.id}`)
        return <li key={review.id}>{review.content}</li>
    })
    return <ul>{renderedReviews}</ul>
}

export default ReviewList
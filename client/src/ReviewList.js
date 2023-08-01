import React from "react";


const ReviewList  = ({reviews}) => {
    
   
    const renderedReviews = reviews.map(review => {
        //console.log(`reviewId ${review.id}`)
        return <li key={review.id}>{review.content}</li>
    })
    return <ul>{renderedReviews}</ul>
}

export default ReviewList
import React from "react";


const ReviewList  = ({reviews}) => {
    
   
    const renderedReviews = reviews.map(review => {
        //console.log(`reviewId ${review.id}`)
        let content
        if(review.status === 'approved') {
            content = review.content
        }
        if(review.status === 'pending') {
            content = 'This review is awaitng moderation'
        }
        if(review.status === 'rejected') {
            content = 'This review has been rejected'
        }
        return <li key={review.id}>{content}</li>
    })
    return <ul>{renderedReviews}</ul>
}

export default ReviewList
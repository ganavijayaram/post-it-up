import React from 'react'
import MovieCreate from './MovieCreate'

//using the arrow function syntax in JavaScript.
//Functional components are a fundamental building block in React, and they are used to create reusable UI elements.
const App = () => {
    return <div className='container'>
        <h1>Create Movie</h1>
        <MovieCreate/>
    </div>
}

export default App
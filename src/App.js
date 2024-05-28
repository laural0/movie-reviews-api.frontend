import './App.css'
import api from './api/AxiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/header/Header'
import Trailer from './components/trailer/Trailer'
import Reviews from './components/reviews/Reviews'
import NotFound from './components/notFound/NotFound'
import SignUp from './components/signUp/SignUp'
import Login from './components/login/Login'

function App() {
  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState()

  const getMovies = async () => {
    try {
      const response = await api.get('/api/v0/movies')

      setMovies(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v0/movies/${movieId}`)

      const singleMovie = response.data

      setMovie(singleMovie)

      setReviews(singleMovie.reviewIds)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={movies ? <Home movies={movies} /> : 'Loading...'}
          ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

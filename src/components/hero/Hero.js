import './Hero.css'
import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowBack,
  ArrowForward,
} from 'react-material-ui-carousel/dist/components/Styled'

const Hero = ({ movies }) => {
  const navigate = useNavigate()
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`)
  }
  return (
    <div className="movie-carousel-container">
      <Carousel
        indicators={false}
        navButtonsIcons={{
          prev: <ArrowBack />,
          next: <ArrowForward />,
        }}
      >
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ '--img': `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>

                      <div>
                        <button
                          className="reviews-button1"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          )
        })}
      </Carousel>
    </div>
  )
}

export default Hero

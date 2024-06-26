import { useEffect, useRef } from 'react'
import api from '../../api/AxiosConfig'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import ReviewForm from '../reviewForm/ReviewForm'

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef()
  let params = useParams()
  const movieId = params.movieId
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    getMovieData(movieId)
  }, [])

  const addReview = async (e) => {
    e.preventDefault()

    const rev = revText.current

    try {
      const response = await api.post(
        `/api/v0/reviews/addreview/imdbid/${movieId}/userid/${userId}`,
        {
          reviewBody: rev.value,
        }
      )

      const updatedReviews = [...reviews, { body: rev.value }]
      rev.value = ''

      setReviews(updatedReviews)
      console.log(updatedReviews)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  ></ReviewForm>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {Array.isArray(reviews) &&
            reviews.map((r) => {
              return (
                <>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              )
            })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews

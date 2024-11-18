import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewform/ReviewForm";
import api from "../../api/axiosConfig";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    // console.log("Params:", params, "Movie ID:", movieId);

    // Fetch movie data when the component mounts
    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);

    // Add a new review
    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        if (!rev.value.trim()) {
            alert("Review cannot be empty!");
            return;
        }

        try {
            // Send the review to the backend
            const response = await api.post("/api/v1/reviews", {
                reviewBody: rev.value,
                imdbId: movieId,
            });

            const newReview = response.data; // Assume the API response contains the new review
            rev.value = "";

            // Update the reviews state
            setReviews((prevReviews) => [...(prevReviews || []), newReview]);
            // getMovieData(movieId)
           
        } catch (err) {
            console.error("Error adding review:", err);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="Movie Poster" style={{ maxWidth: "100%" }} />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                {/* Review Form */}
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {/* Display Reviews */}
                    {reviews?.length > 0 ? (
                        reviews.map((r, index) => (
                            <div key={index + "_" + r.body}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </div>
                        ))
                    ) : (
                        <p>No Reviews</p>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;

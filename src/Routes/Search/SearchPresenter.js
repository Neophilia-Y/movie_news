import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Error from "Components/Error";
import Poster from "Components/Poster";

const Form = styled.form`
  margin-bottom: 50px;
`;
const Container = styled.div`
  padding: 0 20px;
`;
const Input = styled.input`
  all: unset;
  font-size: 25px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm,
}) => (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or Tv Shows.."
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
          <>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Show Results">
                {tvResults.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.original_name}
                    rating={show.vote_average}
                    year={show.first_air_date.substring(0, 4)}
                  />
                ))}
              </Section>
            )}
            {movieResults &&
              tvResults.length === 0 &&
              movieResults.length === 0 && <Error text="Results not Found" />}
          </>
        )}
      {error && <Error text={error} />}
    </Container>
  );

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func,
};

export default SearchPresenter;
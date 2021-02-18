import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Link, Route, withRouter } from "react-router-dom";
import TabInfo from "../../Components/TabInfo";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ImdbLink = styled.a`
  font-size: 20px;
  background-color : yellow;
  color: black;
  round: 10px;
  padding: 0px 10px;
  border-radius: 10px;
`;

const VideoContainer = styled.div`
  padding: 30px 3px;

`;
const Iframe = styled.iframe`
  display: block;
  margin: 20px;
  border: solid 2px red;
`;
const ExtraInfo = styled.div`
  margin : 20px;
`;
const Tabs = styled.ul`
  height:30px;
  display: flex;

`;

const Tab = styled.li`
margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  color: yellow;
  border: 2px solid red;
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "white" : "transparent")};
`;

const SeasonInfo = styled.div`
display: flex;
  margin: 20px 0px;
  width: 100%;

`;
const Season = styled.div`
  margin: 10px;
  width: 200px;
  height: 300px;
`;


const DetailPresenter = withRouter(({ location: { pathname }, result, loading, error, isMovie, id }) =>
  loading ? (

    <Loader />

  ) : (
      < Container >
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`} />
        <Content>
          <Cover
            bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ImdbLink href={`https://www.imdb.com/title/${result.imdb_id}/`}>IMDB Link</ImdbLink>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>

            {!isMovie && result.seasons && result.seasons.length > 0 && (<SeasonInfo>
              {result.seasons.map((season) => (
                <Season>
                  <img width="200px" src={`https://image.tmdb.org/t/p/original${season.poster_path}`} alt={season.name}></img>
                  <h4>{season.name}</h4>
                </Season>
              ))}
            </SeasonInfo>
            )}

            {result.videos && result.videos.results.length > 0 && (
              <VideoContainer>
                {result.videos.results.map((i, index) => (
                  <Iframe title={index} width="300" height="160" src={`https://www.youtube.com/embed/${i.key}`}></Iframe>
                ))
                }
              </VideoContainer>)
            }

            <ExtraInfo>
              <Tabs>
                <Tab active={pathname.includes("company")}>
                  <Link to={{
                    pathname: isMovie ? `/movie/${id}/company` : `/show/${id}/company`,
                    state: {
                      info: (result.production_companies || null),
                    }
                  }} >Company</Link>
                </Tab>
                <Tab active={pathname.includes("country")}>
                  <Link to={{
                    pathname: isMovie ? `/movie/${id}/country` : `/show/${id}/country`,
                    state: {
                      info: (result.production_countries || null),
                    }
                  }}>Country</Link>
                </Tab>
              </Tabs>

              <Route path={isMovie ? `/movie/${id}/company` : `/show/${id}/company`} component={TabInfo} />
              <Route path={isMovie ? `/movie/${id}/country` : `/show/${id}/country`} component={TabInfo} />


            </ExtraInfo>

          </Data>
        </Content>
      </Container >
    ));

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
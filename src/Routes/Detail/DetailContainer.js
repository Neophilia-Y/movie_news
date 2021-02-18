import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),
      id: null,
    };

  }
  render() {
    const { result, loading, error, isMovie, id } = this.state;
    return <DetailPresenter result={result} loading={loading} error={error} isMovie={isMovie} id={id} />;
  }
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const { isMovie } = this.state;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      push("/");
    }
    let result;
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(parseId);
        result = request.data;
      } else {
        const request = await tvApi.showDetail(parseId);
        result = request.data;
      }
    } catch {
      this.setState({ error: "Can't find Result" });
    } finally {
      this.setState({ loading: false, result: result, id: id });
      console.log(result)
    }
  }
}

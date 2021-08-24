import { Component } from 'react';

//Router
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Axios for API requests
import axios from 'axios';

//Api Key
import apiKey from './config';

//Components
import Search from './components/Search/Search.component';
import Navigation from './components/Navigation/Navigation.component';
import PhotoContainer from './components/Gallery/PhotoContainer.component';
import NoResultsFound from './components/Gallery/NoResultsFound.component';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galaxy: [],
      cars: [],
      nature: [],
      searchedPhotos: [],
      query: '',
      isLoading: true,
      noResults: false,
    };
  }

  checkSearchURL() {
    // Get the url pathname and perform a get data if the url matched /search/
    const searchURL = window.location.pathname.match('/search/');

    if (searchURL) {
      const sQuery = searchURL.input.split('/search/');
      this.setState({
        query: sQuery[1],
      });
      this.getData(sQuery[1]);
    }
  }

  //Get photos when the App component mounts
  componentDidMount() {
    this.getData('galaxy');
    this.getData('cars');
    this.getData('nature');
    this.checkSearchURL();

    //Detect browser back and forward button
    window.addEventListener('popstate', event => {
      this.checkSearchURL(); //Check if the URL contains search query. If so, make an API call.
    });
  }
  /**
   *  Performs a API request to flicker and retrieves data based on the query given.
   * @param {String} query - the query string for API calls
   */
  getData(query) {
    this.setState({ isLoading: true, noResults: false });
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`,
      )
      .then(res => {
        const photos = res.data.photos.photo;

        if (query === 'galaxy' || query === 'cars' || query === 'nature') {
          this.setState({
            [query]: photos,
            isLoading: false,
          });
        } else {
          this.setState({
            searchedPhotos: photos,
            isLoading: false,
          });

          //If no photos returned, set noResults state to true
          if (this.state.searchedPhotos.length === 0) {
            this.setState({
              noResults: true,
            });
          } else {
            this.setState({
              noResults: false,
            });
          }
        }
      })
      .catch(err => {
        console.log(`An error has occured: ${err}`);
      });
  }

  /**
   * A callback function used for getting the data from Search component and calling getData
   * to get the queried photos
   * @param {String} query - Searched query string
   */
  searchQueryHandler(query) {
    this.setState({
      query,
    });
    this.getData(query);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search searchQuery={this.state.query} onSubmit={query => this.searchQueryHandler(query)} />
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/galaxy" />} />
            <Route
              exact
              path="/galaxy"
              render={() => (
                <PhotoContainer photos={this.state.galaxy} isLoading={this.state.isLoading} query="Galaxy" />
              )}
            />
            <Route
              exact
              path="/cars"
              render={() => (
                <PhotoContainer photos={this.state.cars} isLoading={this.state.isLoading} query="Cars" />
              )}
            />
            <Route
              exact
              path="/nature"
              render={() => (
                <PhotoContainer photos={this.state.nature} isLoading={this.state.isLoading} query="Nature" />
              )}
            />
            <Route
              path={`/search/${this.state.query}`}
              render={() => (
                <PhotoContainer
                  photos={this.state.searchedPhotos}
                  isLoading={this.state.isLoading}
                  query={this.state.query}
                  noResults={this.state.noResults}
                />
              )}
            />

            <Route component={NoResultsFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

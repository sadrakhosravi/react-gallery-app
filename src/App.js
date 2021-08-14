import { Component } from 'react';

//Router
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Axios
import axios from 'axios';

//Api Key
import apiKey from './config';

//App components
import Search from './components/Search/search.component';
import Navigation from './components/Navigation/Navigation.component';
import PhotoContainer from './components/Gallery/PhotoContainer.component';
import NoResultsFound from './components/Gallery/NoResultsFound.component';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { galaxy: [], waterfall: [], nature: [], searchedPhotos: [], isLoading: true };
  }

  //Get photos when the App component mounts
  componentDidMount() {
    this.getData('galaxy');
    this.getData('cars');
    this.getData('nature');
  }

  /**
   *  Performs a API request to flicker and retrieves data based on the query given.
   * @param {String} query - the query for Flicker API tags
   */
  getData(query) {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`,
      )
      .then(res => {
        const photos = res.data.photos.photo;
        this.setState({
          [query]: photos,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(`An error has occured: ${err}`);
      });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search />
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
            <NoResultsFound />
          </Switch>
        </div>
      </Router>
    );
  }
}

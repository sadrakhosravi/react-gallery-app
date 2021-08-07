import Search from './Compontents/Search/search.component';
import Navigation from './Compontents/Navigation/Navigation.component';
import PhotoContainer from './Compontents/Gallery/PhotoContainer.component';

import './App.css';

function App() {
  return (
    <div className="container">
      <Search />
      <Navigation />
      <PhotoContainer />
    </div>
  );
}

export default App;

import React from 'react';
import SideBar from './components/partials/SideBar';
import ContentWrapper from './components/ContentWrapper';
import GenresInDb from './components/GenresInDb';
import LastMovieInDb from './components/LastMovieInDb';
import ContentRowMovies from './components/ContentRowMovies';
import NotFound from './components/NotFound';
import {Route, Switch} from 'react-router-dom';
import SearchMovies from './components/SearchMovies';
function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
          <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/GenresInDb">
                    <GenresInDb />
                </Route>
                <Route path="/LastMovieInDb">
                    <LastMovieInDb />
                </Route>
                <Route path="/ContentRowMovies">
                    <ContentRowMovies />
                </Route>
                <Route path="/SearchMovies">
                    <SearchMovies />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;

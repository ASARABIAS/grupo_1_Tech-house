import React from 'react';
import SideBar from './components/partials/SideBar';
import NotFound from './components/NotFound';
import {Route, Switch} from 'react-router-dom';
import Product from './components/mains/product/Product';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
          <Switch>
                <Route exact path="/">

                </Route>
                <Route path="/Products">
                    <Product />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;

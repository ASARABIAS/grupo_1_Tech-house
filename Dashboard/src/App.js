import React from 'react';
import SideBar from './components/partials/SideBar';
import NotFound from './components/NotFound';
import {Route, Routes} from 'react-router-dom';
import Product from './components/mains/product/Product';
import DetailProduct from './components/mains/product/DetailProduct';
import LastProduct from './components/mains/product/LastProduct';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
          <Routes>
                <Route exact path="/" />
                <Route path="/Products" element={<Product/>}/>
                <Route path="/Products/:id" element={<DetailProduct />}/>
                <Route path="/Products/last/:id" element={<LastProduct/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    </React.Fragment>
  );
}

export default App;

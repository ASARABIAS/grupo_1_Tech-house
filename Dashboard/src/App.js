import React from 'react';
import SideBar from './components/partials/SideBar';
import NotFound from './components/NotFound';
import { Route, Routes } from 'react-router-dom';
import Product from './components/mains/product/Product';
import DetailProduct from './components/mains/product/DetailProduct';
import Index from './components/mains/Index';
import User from './components/mains/user/User';
import DetailUser from './components/mains/user/DetailUser';

function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/:id" element={<DetailUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;

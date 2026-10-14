import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Sign_in from './pages/Sign_in';
import Sign_up from './pages/Sign_up';
import Admin_home from './pages/Admin_home';
import Customer_home from './pages/Customer_home';
import Product_manage from './pages/Product_manage';
import Add_product from './pages/products/Add_product';
import Delete_product from './pages/products/Delete_product';
import Search_product from './pages/products/Search_product';
import Update_product from './pages/products/Update_product';
import Cart_page from './pages/Cart_page';
import Payment_success from './pages/Payment_success';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/sign_in" element={<Sign_in />} />
      <Route path="/admin_home" element={<Admin_home />} />
      <Route path="/customer_home" element={<Customer_home />} />
      <Route path="/pm" element={<Product_manage />} />
      <Route path="/addProd" element={<Add_product />} />
      <Route path="/updateProd" element={<Update_product />} />
      <Route path="/SearchProd" element={<Search_product />} />
      <Route path="/deleteProd" element={<Delete_product />} />
      <Route path="/cart_page" element={<Cart_page />} />
      <Route path="/payment_success" element={<Payment_success />} /> 
      
    </Routes>
  );
}

export default App;

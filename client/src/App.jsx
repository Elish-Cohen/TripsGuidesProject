import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from '../src/components/features/product/AllProducts'
import NavBar from './components/NavBar';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProductForm from './components/features/product/AddProductForm';
import EditProductForm from './components/features/product/EditProductForm';
import OrderSummaryPage from './components/features/order/OrderSummaryPage';
import AllUsers from './components/features/user/AllUsers';
import CategoryGrid from './pages/CategoryGrid';
import AdminOrdersList from './components/features/order/AdminOrdersList';
function App() {

  return (
    <>
    
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path='/admin-orders-list' element={<AdminOrdersList />}></Route>
          {/* <Route path="/MyOrders" element={<MyOrders />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/add-product' element={<AddProductForm />}></Route>
          <Route path='/edit-product/:id' element={<EditProductForm />}></Route>
          <Route path='/order-summary-page' element={<OrderSummaryPage />}></Route>
          <Route path='/all-Users' element={<AllUsers />}></Route>
          <Route path='/category-grid' element={<CategoryGrid />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

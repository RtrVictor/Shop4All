import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import DeliveryPage from './pages/DeliveryPage'
import PaymentPage from './pages/PaymentPage'
import ReviewOrderPage from './pages/ReviewOrderPage'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import EditUserPage from './pages/EditUserPage'
import EditProductPage from './pages/EditProductPage'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Router>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='main'>
        <Container>
          <Routes>
            <Route
              path='/'
              element={<HomePage filteredProducts={filteredProducts} />}
              exact
            />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart/:id?' element={<ShoppingCartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/shipping' element={<DeliveryPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/putOrder' element={<ReviewOrderPage />} />
            <Route path='/order/:id' element={<OrderPage />} />
            <Route path='/admin/manager' element={<AdminPage />} />
            <Route path='/user/edit/:id' element={<EditUserPage />} />
            <Route path='/product/edit/:id' element={<EditProductPage />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </Router>
  )
}

export default App

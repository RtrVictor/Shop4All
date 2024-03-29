import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='main'>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart/:id?' element={<ShoppingCartPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </Router>
  )
}

export default App

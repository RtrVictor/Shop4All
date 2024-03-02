import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <Container>
          <h1>Shop4All</h1>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default App

import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import HomePage from './page/HomePage'

function App() {

  return (
    <>
      <Header />
      <HomePage />
      <Footer />

      <ToastContainer />
    </>
  )
}

export default App

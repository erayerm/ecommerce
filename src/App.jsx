import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import PageContent from './layouts/PageContent'

function App() {

  return (
    <>
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App

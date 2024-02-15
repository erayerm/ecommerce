import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import PageContent from './layouts/PageContent'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlass, faCartShopping, faPhone, faChartSimple, faLocationDot, faEye } from '@fortawesome/free-solid-svg-icons'
import { faUser, faHeart, faEnvelope, faClock } from '@fortawesome/free-regular-svg-icons'
library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faMagnifyingGlass, faCartShopping, faLocationDot, faPhone, faChartSimple, faUser, faHeart, faEnvelope, faClock, faEye)

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
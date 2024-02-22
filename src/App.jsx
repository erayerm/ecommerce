import { ToastContainer } from 'react-toastify'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import PageContent from './layouts/PageContent'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlass, faCartShopping, faPhone, faChartSimple, faLocationDot, faEye, faBorderAll, faListCheck, faAngleDown, faBars, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { faUser, faHeart, faEnvelope, faClock } from '@fortawesome/free-regular-svg-icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoLoginAction } from './store/actions/UserActions'
library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faMagnifyingGlass, faListCheck, faBorderAll, faAngleDown, faBars, faCheck, faX, faCartShopping, faLocationDot, faPhone, faChartSimple, faUser, faHeart, faEnvelope, faClock, faEye)

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLoginAction());
  }, [])

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
import { useState } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import Header from './containers/Public/Header'
import SignIn from './containers/Public/SignIn'
import SignUp from './containers/Public/SignUp'
import { HomePage } from './containers/Homepage/HomePage' 
import { About } from './containers/About/About'
import Navigation from './containers/Public/Navigation'
import Navbar from './components/Navbar'

import { Gen } from './containers/Public/Gen'
import { DetailGen } from './components/DetailGen'
import Footer from './containers/Public/Footer'




function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='w-xl relative justify-center items-center mx-20'>
        
        <Header />
        <Navbar />
        <div className='min-h-32'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/genus/:id' element={<Gen />} />
            <Route path='/detailgen/:id' element={<DetailGen/>} />
            {/* <Route path='/sign-up' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} /> */}
            {/* </Route> */}
          </Routes>
        </div>
        
        <Footer/>
      </div>
      
      </BrowserRouter>
  )
}

export default App

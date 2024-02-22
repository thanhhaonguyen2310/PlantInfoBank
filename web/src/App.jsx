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
import { User } from './containers/User/User'
import Profile from './containers/User/Profile'
import { GenFilter } from './containers/Public/GenFilter'
import Admin from './containers/System/Admin/Admin'




function App() {
  // const [count, setCount] = useState(0)

  return (
    
      <div className='w-xl relative justify-center items-center  '>
        <div className='mx-10 bg-white-500'>
            <Header/>
            {/* <Navbar /> */}
        </div>
        
        <div className='min-h-32 bg-white-500'>
          <Routes path='/*'>
            <Route path='/' element={<HomePage />}/>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='about' element={<About />} />            
            <Route path='genus/:id' element={<Gen />} />
            <Route path='genusfilter' element={<GenFilter/>} />
            <Route path='detailgen/:id' element={<DetailGen/>} />
            <Route path={'/account/*'} element={<User />}/>
            <Route path={'/admin/*'} element={<Admin/>}/>
          </Routes>
          
         
       
        </div>
        
        <Footer/>
      </div>
  )
}

export default App

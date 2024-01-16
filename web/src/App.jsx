import { useState } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import Header from './containers/Public/Header'
import SignIn from './containers/Public/SignIn'
import SignUp from './containers/Public/SignUp'
import { HomePage } from './containers/Homepage/HomePage' 
import { About } from './containers/About/About'
import Navigation from './containers/Public/Navigation'


function App() {
  // const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
      <Header />
      <Navigation/>
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        {/* <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} /> */}
        {/* </Route> */}
      </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
  )
}

export default App

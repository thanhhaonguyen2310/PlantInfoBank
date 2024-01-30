import React from 'react'
// import {Customers,Admin,ManagePost, ManageMenu, System, Profile,Order, ManageBooking, ManageTable} from "../index";
import {User} from '../../User/User'
import Profile from '../../User/Profile'
import { Routes, Route } from "react-router-dom";
import AddSpecies from '../../User/AddSpecies';


const PageContent = () => {
  return (
    <div className='items-center pl-20 w-full'>

    <Routes path={'/account/*'} element={<User />}>
      
      <Route path={'profile'} element={<Profile />}></Route>
      <Route path={'addspecies'} element={<AddSpecies/>}></Route>

    </Routes>
    </div>
    
    
  )
}

export default PageContent
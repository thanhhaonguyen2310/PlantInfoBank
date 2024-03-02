import React from 'react'
// import {Customers,Admin,ManagePost, ManageMenu, System, Profile,Order, ManageBooking, ManageTable} from "../index";
import {User} from '../../User/User'
import Profile from '../../User/Profile'
import { Routes, Route } from "react-router-dom";
import AddSpecies from '../../User/AddSpecies';
import ListAddSpecies from '../../User/ListAddSpecies';
import Admin from './Admin';
import ManageListAddSpecies from '../Page/ManageListAddSpecies';
import ManageUser from '../Page/ManageUser';
import AddSpeciesExcel from '../../User/AddSpeciesExcel';
import HierarchicalClusteringDiagram from '../../User/HierarchicalClusteringDiagram';
import Kmeans from '../../User/Kmeans';


const PageContent = () => {
  return (
    <div className='items-center pl-20 w-full'>
      <Routes path={'/admin/*'} element={<Admin/>}>
        {/* <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route> */}
        <Route
          path={'manage-listadd'}
          element={<ManageListAddSpecies/>}
        ></Route>
        <Route path={'manage-user'} element={<ManageUser/>}></Route>
      </Routes>
    <Routes path={'/account/*'} element={<User />}>
      
      <Route path={'profile'} element={<Profile />}></Route>
      <Route path={'listadd'} element={<ListAddSpecies/>}></Route>
      <Route path={'addspecies'} element={<AddSpecies/>}></Route>
      <Route path={'addspeciesexcel'} element={<AddSpeciesExcel/>}></Route>
      <Route path={'hierarchical'} element={<HierarchicalClusteringDiagram/>}></Route>
      <Route path={'kmeans'} element={<Kmeans/>}></Route>
    </Routes>
    </div>
    
    
  )
}

export default PageContent
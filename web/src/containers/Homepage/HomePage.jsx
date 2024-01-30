import React from 'react'
import { Outlet } from 'react-router-dom';
import { SlickSlider } from '../../components/SlickSlider'
import Navbar from '../../components/Navbar';

export const HomePage = () => {
  return (
    <div>
        <div className='container min-h-64 relative '>
      {/* <div className="title_home absolute bg-slate-100 h-[50]px">
				<div className="container">
					<div className="content_widget">
						<span className="underline-yellow absolute top-2 h-14 w-2.5 bg-yellow-500 z-1"></span>
						<h2 className="ml-8">

							CƠ SỞ DỮ LIỆU NGUỒN GEN</h2>

					</div>
				</div>
			</div> */}
      {/* slider */}
      <Navbar/>
      <SlickSlider />
      <div className='w-full flex flex-col items-center justify-between'>
          
          <Outlet />
      </div>
    </div>
    </div>
    
  )
}

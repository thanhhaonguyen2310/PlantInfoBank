import React from 'react'
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className='container'>
      {/* slider */}
      <div className='w-full flex flex-col items-center justify-between'>
          <Outlet />
      </div>
    </div>
  )
}

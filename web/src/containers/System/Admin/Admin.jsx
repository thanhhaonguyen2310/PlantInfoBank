import React from 'react'
import PageContent from './PageContent';
import SlideMenu from './SideMenu'

const Admin = () => {
  return (
    <div className='flex '>
      <div className='w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700'>
          {/* <User/> */}
          <SlideMenu/>
  
      </div>
        
        <PageContent />
    </div>
  )
}

export default Admin
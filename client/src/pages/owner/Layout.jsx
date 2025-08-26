import React, { useEffect } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import NavbarOwner from '../../components/owner/NavbarOwner'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext();

  useEffect(()=>{
    if(!isOwner) navigate('/');
  }, [isOwner]);
  
  return (
    <div className='flex flex-col'>
      <NavbarOwner/>
      <div className='flex'>
        <Sidebar/>
        <div className="flex-1 p-8">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout

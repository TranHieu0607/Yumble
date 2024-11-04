import React from 'react'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
      navigate('/login')
    }
  return (
    <div className=' flex justify-between'>
        <div>Header</div>
        <button className='bg-slate-400 rounded-md p-3 mr-5' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Header
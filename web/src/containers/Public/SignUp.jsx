import { useState } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/auth'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";

export default function SignIn() {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.register(formData))
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='name' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />
        <input type="number" placeholder='Phone' id='phone' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />
        <input type="password" placeholder='Password' id='password' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />
        <input type="text" placeholder='Address' id='address' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />

        <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account</p>

        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/auth'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";

export default function SignIn() {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.login(formData))
    navigate(`/`)
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="number" placeholder='Phone' id='phone' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />
        <input type="password" placeholder='Password' id='password' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          />

        <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
      </form>

      <div className="flex gap-2 mt-5">
         <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/auth'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import {FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope,FaPhoneAlt} from 'react-icons/fa'
import { MdLockOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignIn() {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { loading, error } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    // console.log(e.target.name)
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.login(formData))
    setTimeout(function() {
    const { token } = useSelector(state => state.auth)
    console.log(token)
      token === null ?  toast.success('Đăng nhập thành công !', {
                      position: "top-right"
                }) : toast.error('Đã xảy ra lỗi. Vui lòng kiểm tra lại số điện thoại hoặc mật khẩu của bạn!', {
                    position: "top-right"
                }) 
    },1000)

  }
    useEffect(() => {
      isLoggedIn &&  setTimeout(function() {
        console.log(isLoggedIn)
        navigate('/')
    }, 2000);
  }, [isLoggedIn])
  
  
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
           <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
              <div className='w-3/5 p-5'>
                <div className='text-left font-bold'>
                    <span className='text-green-500'>CâyXanh</span>
                </div>
                <form className='py-10' onSubmit={handleSubmit}>
                    <h2 className='text-3xl font-bold text-green-500 mb-2'>Sign in</h2>
                    <div className='border-2 w-10 border-green-500 inline-block mb-2'> </div>
                    <div className='flex justify-center my-2'>
                      <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                        <FaFacebookF className='text-sm'/>
                      </a>
                      <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                        <FaLinkedinIn className='text-sm'/>
                      </a>
                      <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                        <FaGoogle className='text-sm'/>
                      </a>
                    </div>
                    <p className='text-gray-400 my-3'>or use your email account</p>
                    <div className='flex flex-col items-center'>
                          <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                              <FaPhoneAlt className='text-gray-400 mr-2' />
                              <input type='number' name='phone' placeholder='phone' className='bg-gray-100 outline-none text-sm flex-1'
                                onChange={handleChange}
                              />
                          </div>
                          <div className='bg-gray-100 w-64 p-2 flex items-center mb-5'>
                              <MdLockOutline className='text-gray-400 mr-2' />
                              <input type='password' name='password' placeholder='password' className='bg-gray-100 outline-none text-sm flex-1'
                                onChange={handleChange}
                              />
                          </div>
                          <div className='flex justify-between w-64 mb-5 text-xs'>
                              <p className=''>Dont Have an account?</p>
                              <Link to='/sign-up'>
                                <span className='text-blue-500'>Sign up</span>
                              </Link>
                          </div>
                          <button
                           className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>
                            Sign In</button>
                    </div>
                </form>
                  
              </div>

              <div className='w-2/5 bg-green-500'>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPC9sI8iq2_lgwOhOsCByq4Npnx8yjQNGhrw&usqp=CAU" 
                    className='w-full h-full'
                  alt="" />
              </div>
           </div>
        </div>

      {/* <div className='p-3 max-w-lg mx-auto'>
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
      </div> */}
      <ToastContainer />
    </div>
    
  );
}
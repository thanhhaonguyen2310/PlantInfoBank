import React, {useState, useEffect} from 'react';
// import { FormCreat ,Button,Loading} from '../../components'
import {useDispatch, useSelector} from 'react-redux'
// import { apiUpdateUser, apiUploadImages } from '../../services';
import {getCurrent} from '../../store/actions/user';

// import ModalUser from './ModalUser'
// import icons from '../../ultils/icons'
import { Input } from 'antd';
import { render } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const { BsCameraFill, ImBin } = icons
const Profile = () => {
    const {currentData} = useSelector(state => state.user)
    // const {idCurrent} = useSelector(state => state.auth)
    console.log(currentData)

    const [isOrder, setIsOrder] = useState(false);
    
    // console.log(currentData)
    const dispatch = useDispatch()
    const [payload, setPayload] =useState(() => {
      const initData = {
         name: currentData?.name ,
         email: currentData?.email||'' ,
         address: currentData?.address|| '' ,
         gender: currentData?.gender ,
         phone: currentData?.phone  ,
         avatar: currentData?.avatar || '',
         id: currentData?.id || '',
      }
     
      return initData
  })

  const [imagesPreview, setImagesPreview] = useState([payload.avatar])
    const [isLoading, setIsLoading] = useState(false)
  const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }
    const handleFiles = async (e) => {
        console.log(e)
        e.stopPropagation()
        setIsLoading(true)
  
    }
  
    useEffect(() => {
      dispatch(getCurrent())
    },[])
  const handleSubmit = async() =>{
        let finalPayload = {
            name: payload?.name ,
            email: payload?.email ,
            dia_chi: payload?.dia_chi ,
            gender: payload?.gender ,
            phone: payload?.phone ,
            avatar: payload?.avatar[payload?.avatar.length-1],
            id: payload?.id ,
        }
        console.log(payload)
        // const respone =  await apiUpdateUser(finalPayload)
        // respone ?  toast.success('Cập nhật thành công !', {
        //         position: toast.POSITION.TOP_RIGHT
        //     }) : toast.error('Đã xảy ra lỗi. Vui lòng kiểm tra lại!', {
        //         position: toast.POSITION.TOP_RIGHT
        //     }) 
        // setIsOrder(prev =>!prev)
        
  }

  return (
    <div className='w-full bg-white  '>
        <div  className=' pl-10  flex flex-col'>
          <h2 className='flex justify-center text-3xl items-center'>Hồ Sơ Của Tôi</h2>
          <span className='pt-5 text-center'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>

        <div >

          <form className='flex flex-col gap-10 p-10'>           
              <div className='flex justify-center gap-10 items-center'>
                  <label htmlFor="title" className='w-1/5'>Họ và tên</label>
                  <div className=' '>
                      <input
                          type="text"
                          id="name"
                          className='rounded-md w-[500px] outline-none border flex-auto border-gray-300 p-2'
                          value={payload.name}
                          onChange={(e) => setPayload(prev => ({ ...prev, name: e.target.value }))}
                      />
                      
                  </div>
              </div>  

              <div className='flex justify-center gap-10 items-center'>
                  <label htmlFor="title" className='w-1/5'>Số điện thoại</label>
                  <div className=' '>
                      <input
                          type="text"
                          id=" phone"
                          className='rounded-md w-[500px] outline-none border flex-auto border-gray-300 p-2'
                          value={payload.phone}
                          onChange={(e) => setPayload(prev => ({ ...prev, phone: e.target.value }))}
                      />
                      
                  </div>
              </div> 
              
              <div className='flex justify-center gap-10 items-center'>
                  <label htmlFor="title" className='w-1/5'>Địa chỉ</label>
                  <div className=' '>
                      <input
                          type="text"
                          id=" dia_chi"
                          className='rounded-md w-[500px] outline-none border flex-auto border-gray-300 p-2'
                          value={payload.address}
                          onChange={(e) => setPayload(prev => ({ ...prev, dia_chi: e.target.value }))}
                      />
                      
                  </div>
              </div> 
              

            
          </form>
                <div className='flex justify-center gap-10 items-center'>
                  {/* <Button text='Thay đổi mật khẩu'
                    //   onClick={() => }
                      bgColor='bg-green-600' textColor='text-white' 
                      
                      /> */}
                    {/* <div>
                        <ModalUser/>
                    </div> */}
                  <div className="bg-green-600 text-white active:bg-green-600 font-bold  px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> 
                    <button 
                        onClick={handleSubmit} 
                     >Lưu</button>
                  </div>
                  
              </div>
          
        </div>


        
        <ToastContainer />
    </div>
  )
}

export default Profile
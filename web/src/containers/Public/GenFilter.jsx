import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { getFilterSpecies } from '../../store/actions/species'
import {useDispatch, useSelector} from 'react-redux'
import Item from '../../components/Item';
import ReactPaginate from "react-paginate";

export const GenFilter = () => {
  // const { id } = useParams();
  // console.log(id)
  const [page, setPage] = useState(0);
  const dispatch = useDispatch()
  const {datafilter ,species}=  useSelector(state  =>  state.species)

  console.log(species)
  const handlePageClick = async (data) => {
    console.log(data.selected);
    setPage(data.selected)
  };
  useEffect(() => {
    dispatch(getFilterSpecies(datafilter))
  },[datafilter])
  return (
    <div className='w-full items-center justify-items-center '
             
        >

          <div className="title_home relative bg-slate-300 h-18 w-full p-4 z-12">
            <div className="container">
              <div className="content_widget">
                <span className="underline-yellow absolute top-2 h-12 w-2.5 bg-yellow-500  mb-2"></span>
                <h2 className="ml-8">

                  CƠ SỞ DỮ LIỆU NGUỒN GEN</h2>

              </div>
            </div>
          </div>
          <div>
          
            <div className='items  col-span-4'>
                <div className='grid grid-cols-4 gap-5 m-5' >
                    {species?.length > 0 && species?.map(item => {
                        return (
                          <div key={item?.id}>
                              <Item item={item} />
                          </div>
                          
                      )
                    })}
                      
                  {/* {showModal && <ModalItem showModal setShowModal={setShowModal}/> }     */}
                </div>
                

                  {/* <Pagination  type='/menu' category='menu' /> */}
                  
              </div>
          </div>   

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(species.length/12)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex items-center justify-center  gap-2 border-t border-gray-200 bg-white px-4 py-3 sm:px-6 "}
            pageClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm"}
            pageLinkClassName={"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
            previousClassName={"relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
            // previousLinkClassName={"page-link"}
            nextClassName={"relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
            // nextLinkClassName={"page-link"}
            // breakClassName={"page-item"}
            // breakLinkClassName={"page-link"}
            activeClassName={"relative z-10 inline-flex items-center bg-green-500  text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"}
          />
    </div>
  )
}

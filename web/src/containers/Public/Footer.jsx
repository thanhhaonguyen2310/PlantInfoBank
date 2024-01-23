import React from 'react';

const Footer = () => {
    return (
      <footer  className="inline-block mt-20  w-full pb-0 bg-slate-200 m-4">
        <div className="absolute-footer dark medium-text-center small-text-center ">
          <div className="container clearfix flex justify-center p-5 items-center gap-20">
            <div className="footer-primary pull-left right-7">
              <div className="copyright-footer  justify-start">
                <b className='uppercase'>Trường đại học cần thơ</b><br />
                Địa điểm: Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ<br />
                GPĐK: Số 0102957334 cấp ngày 09/04/2008<br />
                ĐT: 0984966806
                Email: tamnguyenmedia@gmail.com    </div>
            </div>

            <div className="footer-secondary pull-right ">
              <div className="footer-text inline-block small-block  justify-end">
                {/* © 2011 Tam Nguyên Media ., JSC. All rights reserved<br /> */}
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIcGZXmQlfWB-dT25pYaCPyHG9eeW3oclfQ&usqp=CAU"  
                  className='w-[100px] h-auto right-5'
                />      
              </div>
            </div>{/* -right */}
            
          </div>
        </div>
        <a href="#top" className="back-to-top button invert plain is-outline hide-for-medium icon circle fixed bottom z-1" id="top-link"><i className="icon-angle-up" /></a>
      </footer>
    );
}

export default Footer;

import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative">
      
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />

      
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-4 md:pl-24 pb-20 md:pb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center md:text-left text-black max-w-[90%] md:max-w-[500px] leading-snug">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

       
        <div className="flex items-center gap-4 mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-6 py-3 text-black hover:text-gray-700 transition"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner

import React from 'react'
import { assets } from '../assets/assets'

const Categories = () => {
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div>
        <div>
            <img src={assets.box_icon} alt=""/>
            <p>fruit</p>
        </div>
      </div>
    </div>
  )
}

export default Categories

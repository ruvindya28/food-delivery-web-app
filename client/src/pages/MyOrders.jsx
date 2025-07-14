import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const {currency}= useAppContext()

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders)
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])


  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
        {myOrders.map((order, index) => (
          <div className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
            <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
              <span>OrderId : {order._id}</span>
              <span>Payment : {order.paymentType}</span>
              <span>Total Amount : {currency}{order.amount}</span>
            </p>
            {order.items.map((item, index) => (
              <div>
                <div className='flex items-center mb-4 md:mb-0'>
                  <div className='bg-primary/10 p-4 rounded-lg'>
                     <img src='{item.product.image[0]}' alt='' className='w-16 h-16' />
                  </div>
                  <div>
                    <h2>{item.product.name}</h2>
                    </div>
                </div>
              </div>
              
            ))}
          </div>
        ))}
    </div>
  )
}

export default MyOrders



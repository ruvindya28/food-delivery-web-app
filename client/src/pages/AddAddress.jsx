import React, { useState } from 'react'
import { assets } from '../assets/assets'

//input field

const InputField =({type,placeholder,name,handleChange,address})=>(
    <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
        className='w-full p-2 border border-gray-300 rounded-md'
    />

    )

const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
        console.log(address);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
    }

    

  return (
    <div className="mt-16 pb-16">
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} type='text' placeholder='First Name' name='firstName'/>
                    <InputField handleChange={handleChange} address={address} type='text' placeholder='Last Name' name='lastName'/>
                </div>
                <InputField handleChange={handleChange} address={address} type='email' placeholder='Email' name='email'/>
                <InputField handleChange={handleChange} address={address} type='tel' placeholder='Phone Number' name='phone'/>
                <InputField handleChange={handleChange} address={address} type='text' placeholder='Street Address' name='street'/>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} type='text' placeholder='City' name='city'/>
                    <InputField handleChange={handleChange} address={address} type='text' placeholder='State' name='state'/>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} type='number' placeholder='Zip Code' name='zip'/>
                    <InputField handleChange={handleChange} address={address} type='text' placeholder='Country' name='country'/>
                </div>
                <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase' type='submit'>
                    Save Address
                </button>
            </form>
        </div>
         <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  )
}

export default AddAddress

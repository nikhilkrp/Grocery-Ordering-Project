import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {

    const [myorders, setMyOrders] = useState([]);
    const { currency } = useAppContext()

    const fetchMyorders = async () => {
        setMyOrders(dummyOrders)
    }
    useEffect(() => {
        fetchMyorders()
    }, [])

    return (
        <div className='mt-16'>
            <div>
                <p className='text-2xl font-semibold uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-green-600 rounded-full'></div>
            </div>
            {myorders.map((order, index) => (
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mt-16 '>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col' >
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : ${order.amount}</span>
                    </p>
                    {
                        order.items.map((item, index) => (
                            <div  key={index} className={`relative bg-white text-gray-500/70 ${
                            order.items.length !==index+1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5md:gap-16 w-full max-w-4xl`}>
                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-green-600/10 p-4 rounded-lg'>
                                         <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                    </div>
                                </div>

                                <div>
                                    <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                    <p>Category: {item.product.category}</p>
                                </div>

                                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-lg font-medium'>
                                    <p>Quantity: {item.quantity||"1"}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                <p className='text-green-600 text-lg font-medium'>
                                Amount : ${item.product.offerPrice *item.quantity}
                                </p>


                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}

export default MyOrders

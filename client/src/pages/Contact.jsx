import React from 'react'

const Contact = () => {
  return (
    <div className='mt-24'>
       <div className='flex flex-col gap-2 w-max items-end'>
           <p className='md:text-3xl font-bold text-xl '>Contact Us</p>
           <div className='w-24  h-0.5 bg-green-500 rounded-3xl'></div>
       </div>
       
       <div className='mt-10 font-bold'>
        <p>Street : SBS Road , Kanpur </p>
        <p>Uttar Pradesh</p>
        <p>India</p>
        <p>Contact Number<span className='cursor-pointer'>+91XXXXXX9999</span> </p>
        <p>Contact Number<span className='cursor-pointer'>+91XXXXXX9999</span> </p>
      
        <p>Email :- cart@gamil.com </p>
        
       </div>
       </div>
     

  
  )
}

export default Contact

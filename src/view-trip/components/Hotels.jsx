import React from 'react'
import { Link } from 'react-router'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommentation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
            {trip?.tripData?.hotelOptions?.map((hotel) => (
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels
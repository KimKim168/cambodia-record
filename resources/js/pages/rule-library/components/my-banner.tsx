import React from 'react'

const MyBanner = () => {
  return (
     <div className="flex-1 w-40 lg:w-80">
        <img
          src="https://source.unsplash.com/900x3200/?banner,technology"
          width={900}
          height={3200}
          alt="Static Banner 1"
          className="w-full h-full object-cover mb-4"
        />
        <img
          src="https://source.unsplash.com/900x3200/?banner,nature"
          width={900}
          height={3200}
          alt="Static Banner 2"
          className="w-full h-full object-cover"
        />
      </div>
  )
}

export default MyBanner

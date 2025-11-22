import React from 'react'
import Middle from './Middle'
import TopLeft from './TopLeft'
import TopRight from './TopRight'

function Navbar() {
  return (
    <div className="w-full h-7 bg-amber-500 flex items-center justify-between px-4">
      <TopLeft />
      <Middle />
      <TopRight />
    </div>

  )
}

export default Navbar
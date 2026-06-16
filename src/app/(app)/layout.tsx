import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-[#FFFFFF]'>
        {children}
    </div>
  )
}

export default layout
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-linear-to-bl from-button-color via-[#7A61F4] to-[#8B5CF6]'>
        <div className='max-w-xl w-full px-4 md:px-0'>
          {children}
        </div>
    </div>
  )
}

export default layout
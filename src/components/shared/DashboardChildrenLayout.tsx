import React from 'react'

type TProps = {
    children: React.ReactNode
    title: string
    subtitle: string
}

const DashboardChildrenLayout = ({ children, title, subtitle }: TProps) => {
    return (
        <section className='p-6 md:p-8 space-y-4 md:space-y-6'>
            <div>
                <h2 className='text-title font-semibold text-xl md:text-2xl'>{title}</h2>
                <p className='text-sm md:text-base text-subtitle font-medium'>{subtitle}</p>
            </div>
            <main>
                {children}
            </main>
        </section>
    )
}

export default DashboardChildrenLayout
"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type TProps = {
    children: React.ReactNode;
    showBackButton?: boolean;
    title?: string;
    subtitle?: string;
    headerAction?: React.ReactNode;
}

const DashboardChildrenLayout = ({ children, title, subtitle, headerAction, showBackButton = false }: TProps) => {
    const router = useRouter();
    return (
        <section className='p-6 md:p-8 space-y-4 md:space-y-6'>
            {/* header and action */}
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3 md:gap-4'>
                    {showBackButton && (
                        <button onClick={() => router.back()} className='text-subtitle hover:text-title transition-colors cursor-pointer mr-1 shrink-0'>
                            <ArrowLeft className='w-6 h-6' />
                        </button>
                    )}
                    <div>
                        <h2 className='text-title font-medium text-xl md:text-2xl'>{title}</h2>
                        <p className='text-sm md:text-base text-subtitle'>{subtitle}</p>
                    </div>
                </div>
                <div className='shrink-0'>
                    {headerAction}
                </div>
            </div>

            <main>
                {children}
            </main>
        </section>
    )
}

export default DashboardChildrenLayout
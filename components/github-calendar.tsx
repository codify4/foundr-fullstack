'use client'

import { useEffect, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { selectLastElevenYear, selectLastNineYear, selectLastSixYear } from '@/lib/github-date'

export const GithubCalendarWrapper = () => {
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            if (width < 768) { // md breakpoint
                setScreenSize('mobile')
            } else if (width < 1280) { // xl breakpoint
                setScreenSize('tablet')
            } else {
                setScreenSize('desktop')
            }
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const getTransformData = () => {
        switch (screenSize) {
            case 'mobile':
                return selectLastSixYear
            case 'tablet':
                return selectLastNineYear
            case 'desktop':
                return selectLastElevenYear
        }
    }

    return (
        <div className="flex justify-center">
            <GitHubCalendar 
                username="codify4" 
                fontSize={screenSize === 'mobile' ? 12 : 14}
                blockSize={screenSize === 'mobile' ? 8 : 10}
                blockMargin={4}
                colorScheme={"light"}
                hideTotalCount
                transformData={getTransformData()}
            />
        </div>
    )
}

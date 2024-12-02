'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white text-primary w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row items-center justify-center">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Image src="/foundr.png" width={40} height={40} alt="foundr" />
              <span className="text-lg font-semibold">Foundr</span>
            </Link>
          </div>
          <Link href="signin">
            <Button variant="default" className='hidden text-white hover:bg-secondary md:flex md:items-center md:justify-center px-5 py-2 rounded-lg'>Sign In</Button>
          </Link>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden inline-flex items-center text-primary justify-center p-2 rounded-md"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-40">
              <div className="flex flex-col items-center justify-center">
                <Link href="#features" className="px-3 py-2 rounded-md">Features</Link>
                <Link href="#pricing" className="px-3 py-2 rounded-md">Pricing</Link>
              </div>
            </PopoverContent>
          </Popover> */}
        </div>
      </div>
    </nav>
  )
}

export default TopNav
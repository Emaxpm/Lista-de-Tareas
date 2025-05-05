"use client"
import { navegación } from '@/contants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className='flex w-full justify-center items-center'>
      <div className='flex px-8 py-2 mt-4 border rounded-lg shadow bg-white'>
        <ul className='flex justify-between gap-4'>
          {navegación.map((link) => {

            const isActive = link.route === pathName || pathName.includes(`${link.route}`);

            return (
              <li
               key={link.route}
               className={`text-lg font-semibold rounded-md hover:bg-blue-100V ${isActive ? "bg-blue-600 text-white" : ""}`}
               >
                <Link className='px-2 w-full cursor-pointer' href={link.route}>
                  {link.titulo}
                </Link>
              </li>
            )
          })}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
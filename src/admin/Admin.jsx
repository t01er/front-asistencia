import React from 'react'
import Header from './Header'
import bg from "../assets/img/bg.jpg"
export default function Admin() {
  return (
    <>
      <Header />
      <main className='background w-full h-screen flex items-center justify-center '>
        <div className=' '>
          <h2 className='text-7xl text-violet-500 font-extrabold'>Bienvenido</h2>
        </div>
      </main>
    </>
  )
}

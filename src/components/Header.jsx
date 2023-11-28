import React from 'react'
import logo from '../assets/images/logo.png'

export default function Header() {
  return (
    <header className='main-header bg-dark text-white p-3'>
        <img src={logo} className='header-logo'/>
    </header>
  )
}

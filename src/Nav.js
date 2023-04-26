import React, { useEffect, useState } from 'react'
import logo from './source/logo.png'
import avatar from './source/avatar.png'
import './Nav.css'

function Nav() {
    const[show, handleShow] = useState(false);

    useEffect(()=>{
    window.addEventListener("scroll",()=>{
    if (window.scrollY > 100){
        handleShow(true);
    } else handleShow(false);
    });
    return ()=>{
    window.removeEventListener("scroll",null)
    }
    },[])



  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img 
            className='nav__logo'
            src={logo}
            alt='logo'
        />

        <img 
            className='nav__avatar'
            src={avatar}
            alt='avatar'
        />
    </div>
  )
}

export default Nav
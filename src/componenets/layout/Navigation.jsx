import {useState} from 'react'
import './navigation.css'
import userIcon from '../../assets/user-icon.png'

const Navigation = () => {
    const user = sessionStorage.getItem("username");
    
  return (
    <div className='header'>
        <div className='navigationBar'>
        <h2>TalkBack</h2>
        <div className='user-options'>
            <p>Hello {user}</p>
            <div className="user-icon">

                <img className='user-icon' src={userIcon} alt="user-icon" />
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Navigation
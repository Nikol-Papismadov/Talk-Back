import {useState} from 'react'
import './navigation.css'
import userIcon from '../../assets/user-icon.png'

const Navigation = () => {
    const user = sessionStorage.getItem("username");
    const [MenuVisibility, setMenuVisibility] = useState('hidden');
    const handleMenuVisibility = () => {
        MenuVisibility === 'hidden' ? setMenuVisibility('visible') : setMenuVisibility('hidden');
    }
  return (
    <div className='navigationBar'>
        <h2>TalkBack</h2>
        <div className='user-options'>
            <p>Hello {user}</p>
            <img className='user-icon' src={userIcon} alt="user-icon" />
            <button onClick={handleMenuVisibility}>Menu</button>
            <div style={{display: {MenuVisibility}}}>
                <ul>
                    <li>Chat Messages</li>
                    <li>Game Requests</li>
                </ul>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navigation
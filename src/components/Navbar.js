import styled from 'styled-components'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react';

function Navbar() {
  const {currentUser} = useContext(AuthContext);
  
    return <Container>
        <span className='logo'>React Chats</span>
          <User>
            <img src={currentUser.photoURL} alt=''/>
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
          </User>
    </Container>
  }

const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: #2f2d52;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #ddddf7;
    .logo{
      font-weight: bold;
    }
` 
const User = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   img{
    background-color: #ddddf7;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    object-fit: cover;
   }
   button{
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 12px;
    border: none;
   }
`

export default Navbar;
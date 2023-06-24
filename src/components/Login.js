import { useNavigate,Link } from 'react-router-dom';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React from 'react';

function Login() {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
           await signInWithEmailAndPassword(auth,email,password)
           navigate("/")
        }catch(err){
            setErr(true);
        }
        };   

    return <Container>
      <div>
        <span className='logo'>React Chats</span>
        <span className='register'>Login</span>
        <Form onSubmit={handleSubmit}>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button>Sign In</button>
            {err && <span>Something went wrong</span>}
        </Form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </Container>
  }

const Container = styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        background-color: white;
        padding: 20px 60px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 10px;
        align-items: center;
        .logo{
            color: #5d5b8d;
            font-weight: bold; 
            font-size: 24px;
        }
        .register{
            color: #5d5b8d;
            font-size: 15px;
        }
        p{
            color: #5d5b8d;
            font-size: 15px;
            margin-top: 10px;
        }
    }
`  
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    input{
        padding: 15px;
        border: none;
        width:250px;
        border-bottom: 1px solid #a7bcff;
        &::placeholder{
            color: rgb(175,175,175);
        }
    }
    button{
        background-color: #7b96ec;
        color: white;
        padding: 10px;
        font-weight: bold;
        border: none;
        cursor: pointer;
    }
`

export default Login;
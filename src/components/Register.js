import styled from 'styled-components'
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from "../firebase";
import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate, Link} from "react-router-dom";

function Register() {
   const [err, setErr] = React.useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on( (error) => {
                setErr(true);
            }, 
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL:downloadURL
                })
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/"); 
            });
        }
        );
        }
        catch(err){
            setErr(true);
        }
        };   

    return <Container>
      <div>
        <span className='logo'>React Chats</span>
        <span className='register'>Register</span>
        <Form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name"></input>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <input style={{display:"none"}} type="file" id='file'/>
            <label htmlFor="file">
                <img src={Add} alt=''/>
                <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something went wrong</span>}
        </Form>
        <p>Do you have an account? <Link to="/login">Login</Link></p>
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
    label{
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8da4f1;
        font-size: 12px;
        cursor: pointer;
        img{
            width: 32px;
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

export default Register;